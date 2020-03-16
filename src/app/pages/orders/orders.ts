import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: 'orders.html',
    styleUrls: ['orders.scss']
})
export class OrdersPage {

    constructor(
        public alertController: AlertController,
        private route: Router,
    ) {}

    async selectProduct() {
        const alert = await this.alertController.create({
            header: 'Leche south 1 L!',
            inputs: [
                {
                    name: 'productQuantity',
                    type: 'number',
                    value: 3,
                   // autofocus: true,
                    placeholder: 'Cantidad',
                    min: 1,
                    max: 10
                }
            ],
            buttons: [
                {
                    text: 'Remover',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Actualizar',
                    cssClass: 'pagami',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

    async makeOrder() {
        const alert = await this.alertController.create({
            header: 'Agregar Detalles de Contacto',
            message: 'No podemos realizar tu pedido porque falta tu teléfono de contacto y dirección de domicilio',
            buttons: [
                {
                    text: 'Anadir detalles de contacto',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.route.navigate(['/app/profile']);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmDeleteProduct() {
        const alert = await this.alertController.create({
            header: 'Eliminar producto',
            message: 'Esta seguro de que quiere eliminar este producto de su orden?',
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
            ]
        });
        await alert.present();
    }

}
