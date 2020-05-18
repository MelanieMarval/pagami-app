import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputFilePage } from '../../parent/InputFilePage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { ToastProvider } from '../../../providers/toast.provider';
import { FireStorage } from '../../../core/fire-storage/fire.storage';
import { Product } from '../../../core/api/products/product';
import { ProductsService } from '../../../core/api/products/products.service';
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

    constructor(
        private http: HttpClient,
        private alertController: AlertController,
        private route: Router,
        private toast: ToastProvider,
        private fireStorage: FireStorage,
        private intentProvider: UserIntentProvider,
        private productsService: ProductsService,
        protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    get data() {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10000000)]),
            stock: new FormControl('', [Validators.required, Validators.max(500)]),
            description: new FormControl('', Validators.maxLength(300))
        });
        if (this.intentProvider.productToEdit) {
            this.loadForm('edit');
        } else {
            this.loadForm('add');
        }
    }

    loadForm(action: string, product?: Product) {
        if ('add') {
            this.form.reset();
        } else {
            const productValues = {
                name: product.name,
                stock: product.stock,
                price: product.price,
                description: product.description,
                // description: product.description ? product.description : '',
                available: product.available
            };
            this.previewUrl = product.photoUrl;
            this.form.setValue(productValues);
        }
    }

    saveProduct() {
        if (!this.previewUrl) {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar una imagen para representar su producto');
        }
        const placeId = this.intentProvider.myBusinessId;
        this.product = {
            placeId,
            name: this.data.name.value,
            price: this.data.price.value,
            stock: this.data.stock.value,
            description: this.data.description.value,
            available: true
        };
        if (!this.product.photoUrl) {
            this.saveImage();
        } else {
            if (this.previewUrl !== this.product.photoUrl) {
                this.saveImage();
            } else {
                this.updateProduct();
            }
        }
    }

    async saveImage() {
        this.updating = true;
        const success = await this.fireStorage.saveProfileImage(this.fileData);
        if (success) {
            this.product.photoUrl = success;
            this.previewUrl = success;
            this.updateProduct();
        } else {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargarndo la imagen. Intente de nuevo');
            this.updating = false;
        }
    }

    updateProduct() {
        this.updating = true;
        this.productsService.save(this.product)
            .then(success => {
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su producto ha sido guardado con exito!');
                    this.route.navigate(['/app/my-products']);
                    this.updating = false;
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargarndo la imagen. Intente de nuevo');
                    this.updating = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargarndo la imagen. Intente de nuevo');
            this.updating = false;
        });
    }

    async confirmDeleteProduct() {
        const alert = await this.alertController.create({
            header: 'Eliminar producto',
            message: 'Esta seguro de que quiere eliminar este producto?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si, eliminar',
                    cssClass: 'alert-confirm',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ],
            cssClass: 'ion-color-pagami-surface'
        });

        await alert.present();
    }
}
