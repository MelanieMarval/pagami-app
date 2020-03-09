import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-products',
    templateUrl: 'products.html',
    styleUrls: ['products.scss']
})
export class ProductsPage {
    constructor( public alertController: AlertController ) {}

    async selectProduct() {
        const alert = await this.alertController.create({
            header: 'Leche south 1 L!',
            inputs: [
                {
                    name: 'productQuantity',
                    type: 'number',
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
