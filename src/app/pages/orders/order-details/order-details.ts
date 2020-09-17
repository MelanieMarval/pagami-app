import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-details',
    templateUrl: 'order-details.html',
    styleUrls: ['order-details.scss']
})
export class OrderDetailsPage {

    constructor(private alertController: AlertController,
                private route: Router) {
    }

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
            header: 'Cancelación de pedido',
            message: 'Estas seguro que quieres cancelar el pedido actual?',
            buttons: [
                {
                    text: 'No, cerrar',
                    role: 'cancel',
                    cssClass: 'alert-cancel'
                }, {
                    text: 'Si, Cancelar pedido',
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
