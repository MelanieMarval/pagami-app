import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputFilePage } from '../../parent/InputFilePage';
// Services
import { CurrenciesService } from '../../../core/api/currencies/currencies.service';
import { ServicesService } from '../../../core/api/services/services.service';
import { FireStorage } from '../../../core/fire-storage/fire.storage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
// Providers
import { ToastProvider } from '../../../providers/toast.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
// Interfaces
import { Service } from '../../../core/api/services/service';
import { Currency } from '../../../core/api/currencies/currency';

@Component({
    selector: 'app-add-service',
    templateUrl: 'add-service.html',
    styleUrls: ['add-service.scss']
})
export class AddServicePage extends InputFilePage implements OnInit {

    form: FormGroup;
    service: Service;
    updating = false;
    currencies: Currency[] = [];
    currency: Currency;
    localCurrency: string;
    action: string;
    localSelected: { currency: string, price: number };

    constructor(
        private http: HttpClient,
        private alertController: AlertController,
        private route: Router,
        private toast: ToastProvider,
        private fireStorage: FireStorage,
        private intentProvider: UserIntentProvider,
        private servicesService: ServicesService,
        private currenciesService: CurrenciesService,
        protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    get data() {
        return this.form.controls;
    }

    ngOnInit() {
        this.currenciesService.getCurrencies()
            .then(success => {
                if (success.passed) {
                    this.currencies = success.response;
                    this.currency = this.currencies.filter(currency => currency.countryAcronym === this.intentProvider.myBusinessDetails.acronym)[0];
                } else {
                    return this.toast.messageErrorWithoutTabs('No se han podido cargar las monedas. Compruebe su conexion!');
                }
            });
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            price: new FormControl(null, [Validators.min(1), Validators.max(10000000)]),
            localPrice: new FormControl(null, [Validators.min(1), Validators.max(10000000)]),
            available: new FormControl(true),
            description: new FormControl('', Validators.maxLength(300))
        });
        if (this.intentProvider.productToEdit) {
            this.action = 'edit';
            this.loadForm(this.intentProvider.productToEdit);
        } else {
            this.action = 'add';
            this.loadForm();
        }
    }

    loadForm(service?: Service) {
        if (this.action === 'add') {
            this.form.reset();
            this.form.get('available').setValue(true);
            this.localCurrency = null;
        } else {
            this.service = service;
            console.log(this.intentProvider.productToEdit);
            const productValues = {
                name: service.name,
                price: service.price,
                description: service.description,
                available: service.available,
                localPrice: service.localPrice,
            };
            this.localCurrency = service.localCurrency;
            this.previewUrl = service.photoUrl;
            this.form.setValue(productValues);
            this.intentProvider.productToEdit = undefined;
        }
    }

    saveProduct() {
        if (!this.previewUrl) {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar una imagen para representar su servicio');
        }
        if (!this.data.localPrice.value && !this.data.price.value) {
            return this.toast.messageErrorWithoutTabs('Debe colocar el precio en dolares o en su moneda local');
        }
        if ((this.data.localPrice.value && !this.localCurrency) || (!this.data.localPrice.value && this.localCurrency)) {
            return this.toast.messageErrorWithoutTabs('Si coloca el precio local debe seleccionar tambien la moneda');
        }

        if (this.action === 'add') {
            this.service = {
                placeId: this.intentProvider.myBusinessDetails.id,
                name: this.data.name.value,
                price: this.data.price.value,
                description: this.data.description.value,
                available: this.data.available.value,
                localPrice: this.data.localPrice.value,
                localCurrency: this.localCurrency,
            };
        } else {
            this.service.name = this.data.name.value;
            this.service.price = this.data.price.value;
            this.service.description = this.data.description.value;
            this.service.available = this.data.available.value;
            this.service.localPrice = this.data.localPrice.value;
            this.service.localCurrency = this.localCurrency;
        }

        if (!this.service.photoUrl) {
            this.saveImage();
        } else {
            if (this.previewUrl !== this.service.photoUrl) {
                this.saveImage();
            } else {
                this.action === 'add' ? this.addProduct() : this.updateProduct();
            }
        }
    }

    async saveImage() {
        this.updating = true;
        const success = await this.fireStorage.saveProfileImage(this.fileData);
        if (success) {
            this.service.photoUrl = success;
            this.previewUrl = success;
            this.action === 'add' ? this.addProduct() : this.updateProduct();
        } else {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando la imagen. Intente de nuevo');
            this.updating = false;
        }
    }

    addProduct() {
        this.updating = true;
        this.servicesService.save(this.service)
            .then(success => {
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su servicio ha sido guardado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                    this.intentProvider.reloadProducts = true;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando su servicio. Intente de nuevo');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando su servicio. Intente de nuevo');
            this.updating = false;
        });
    }

    updateProduct() {
        this.updating = true;
        this.servicesService.update(this.service, this.service.id)
            .then(success => {
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su servicio ha sido actualizado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                    this.intentProvider.productEdited = success.response;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas actualizando su servicio. Intente de nuevo');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas actualizando su servicio. Intente de nuevo');
            this.updating = false;
        });
    }

    deleteProduct() {
        this.updating = true;
        this.servicesService.delete(this.service.id)
            .then(success => {
                if (success.passed) {
                    console.log(success);
                    this.toast.messageSuccessWithoutTabs('Su servicio ha sido eliminado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                    this.intentProvider.serviceDeleted = this.service;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas eliminando el servicio');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas internos. Intente mas tarde!');
            this.updating = false;
        });
    }

    async confirmDeleteProduct() {
        const alert = await this.alertController.create({
            header: 'Eliminar servicio',
            message: 'Esta seguro de que quiere eliminar este servicio?',
            cssClass: 'ion-color-pagami-surface',
            buttons: [
                {
                    text: 'Cnacelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel'
                }, {
                    text: 'Si, eliminar',
                    cssClass: 'alert-confirm',
                    handler: () => {
                        this.deleteProduct();
                    }
                }
            ]
        });

        await alert.present();
    }

    compareFn(e1: any, e2: any): boolean {
        return e1 && e2 ? e1 === e2 : e1 === e2;
    }
}
