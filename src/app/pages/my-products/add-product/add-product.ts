import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputFilePage } from '../../parent/InputFilePage';
// Services
import { ProductsService } from '../../../core/api/products/products.service';
import { Product } from '../../../core/api/products/product';
import { CurrenciesService } from '../../../core/api/currencies/currencies.service';
import { Currency } from '../../../core/api/currencies/currency';
import { FireStorage } from '../../../core/fire-storage/fire.storage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
// Providers
import { ToastProvider } from '../../../providers/toast.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';

@Component({
    selector: 'app-add-product',
    templateUrl: 'add-product.html',
    styleUrls: ['add-product.scss']
})
export class AddProductPage extends InputFilePage implements OnInit {

    form: FormGroup;
    product: Product;
    updating = false;
    currencies: Currency[] = [];
    currency: Currency;
    action: string;
    localSelected: { currency: string, price: number };

    constructor(
        private http: HttpClient,
        private alertController: AlertController,
        private route: Router,
        private toast: ToastProvider,
        private fireStorage: FireStorage,
        private intentProvider: UserIntentProvider,
        private productsService: ProductsService,
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
            price: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000000)]),
            localPrice: new FormControl(null),
            localCurrency: new FormControl(''),
            stock: new FormControl(null, [Validators.required, Validators.max(500)]),
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

    loadForm(product?: Product) {
        if (this.action === 'add') {
            this.form.reset();
        } else {
            this.product = product;
            console.log(this.intentProvider.productToEdit);
            const productValues = {
                name: product.name,
                stock: product.stock,
                price: product.price,
                description: product.description,
                available: product.available,
                localPrice: product.localPrice ? product.localPrice : null,
                localCurrency: product.localCurrency ? product.localCurrency : null,
            };
            this.previewUrl = product.photoUrl;
            this.form.setValue(productValues);
            this.intentProvider.productToEdit = undefined;
        }
    }

    saveProduct() {
        if (!this.previewUrl) {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar una imagen para representar su producto');
        }

        if (this.action === 'add') {
            this.product = {
                placeId: this.intentProvider.myBusinessDetails.id,
                name: this.data.name.value,
                price: this.data.price.value,
                stock: this.data.stock.value,
                description: this.data.description.value,
                available: this.data.available.value,
                localPrice: this.data.localPrice.value,
                localCurrency: this.data.localCurrency.value,
            };
        } else {
            this.product.name = this.data.name.value;
            this.product.price = this.data.price.value;
            this.product.stock = this.data.stock.value;
            this.product.description = this.data.description.value;
            this.product.available = this.data.available.value;
            this.product.localPrice = this.data.localPrice.value;
            this.product.localCurrency = this.data.localCurrency.value;
        }

        if (!this.product.photoUrl) {
            this.saveImage();
        } else {
            if (this.previewUrl !== this.product.photoUrl) {
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
            this.product.photoUrl = success;
            this.previewUrl = success;
            this.action === 'add' ? this.addProduct() : this.updateProduct();
        } else {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargarndo la imagen. Intente de nuevo');
            this.updating = false;
        }
    }

    addProduct() {
        this.updating = true;
        this.productsService.save(this.product)
            .then(success => {
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su producto ha sido guardado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                    this.intentProvider.reloadProducts = true;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando su producto. Intente de nuevo');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando su producto. Intente de nuevo');
            this.updating = false;
        });
    }

    updateProduct() {
        this.updating = true;
        this.productsService.update(this.product, this.product.id)
            .then(success => {
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su producto ha sido actualizado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                    this.intentProvider.productEdited = success.response;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas actualizando su producto. Intente de nuevo');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas actualizando su producto. Intente de nuevo');
            this.updating = false;
        });
    }

    deleteProduct() {
        this.updating = true;
        this.productsService.delete(this.product.id)
            .then(success => {
                if (success.passed) {
                    console.log(success);
                    this.toast.messageSuccessWithoutTabs('Su producto ha sido eliminado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                    this.intentProvider.productDeleted = this.product;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas eliminando el producto');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas internos. Intente mas tarde!');
            this.updating = false;
        });
    }

    async confirmDeleteProduct() {
        const alert = await this.alertController.create({
            header: 'Eliminar producto',
            message: 'Esta seguro de que quiere eliminar este producto?',
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
}
