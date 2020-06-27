import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/api/products/products.service';
import { ToastProvider } from '../../../providers/toast.provider';
import { Product } from '../../../core/api/products/product';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { AlertProvider } from '../../../providers/alert.provider';

@Component({
    selector: 'app-products',
    templateUrl: 'products.html',
    styleUrls: ['products.scss']
})
export class ProductsPage implements OnInit {

    loading = false;
    products: Product[] = [];
    textSearch = '';
    title = '';

    constructor(private alertController: AlertController,
                private route: ActivatedRoute,
                private toast: ToastProvider,
                private productsService: ProductsService,
                private intentProvider: UserIntentProvider,
                private alert: AlertProvider,) {
    }

    ngOnInit(): void {
        this.title = this.intentProvider.placeToShow.name;
        const placeId = this.route.snapshot.params.id;
        this.chargeProducts(placeId);
    }

    chargeProducts(placeId: string) {
        this.loading = true;
        this.productsService.getByPlaceId(placeId)
            .then(success => {
                if (success.passed) {
                    this.products = success.response;
                    this.loading = false;
                } else {
                    this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
                    this.loading = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
            this.loading = false;
        });
    }

    async selectProduct(product: Product) {
        const alert = await this.alertController.create({
            header: 'Leche south 1 L!',
            inputs: [
                {
                    name: 'productQuantity',
                    type: 'number',
                    value: 1,
                    placeholder: 'Cantidad',
                    min: 1,
                    max: 10
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Anadir al carrito',
                    cssClass: 'pagami',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }
}
