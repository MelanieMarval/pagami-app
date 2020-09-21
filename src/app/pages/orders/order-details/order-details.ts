import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ORDERS } from '../../../utils/Const';

@Component({
    selector: 'app-order-details',
    templateUrl: 'order-details.html',
    styleUrls: ['order-details.scss']
})
export class OrderDetailsPage {

    status: string;
    STATUS_PRODUCTS = ORDERS.STATUS_PRODUCTS;
    STATUS_SERVICES = ORDERS.STATUS_SERVICES;
    type = 'services';

    constructor(private alertController: AlertController,
                private route: Router) {
    }

    async selectProduct() {
        const alert = await this.alertController.create({
            header: 'Leche south 1 L!',
            cssClass: 'alertProduct',
            inputs: [
                {
                    name: 'productQuantity',
                    type: 'number',
                    value: 3,
                    label: 'Disponibles',
                    // autofocus: true,
                    placeholder: 'Cantidad',
                    min: 1,
                    max: 10
                },
            ],
            message: '<ion-item>' + '' +
                        '<ion-checkbox></ion-checkbox>' +
                        '<ion-label style="vertical-align: top;margin-left: 5px;">Agotado</ion-label>' +
                    '</ion-item>',
            buttons: [
                {
                    text: 'Actualizar Pedido',
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

    async confirmCancelOrder() {
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

    mapStatusOrder(status: string) {
        if (!status) { return 'Estado de la orden'; }
        switch (status) {
            case this.STATUS_PRODUCTS.RECEIVED:
                return 'Recibido';
            case this.STATUS_PRODUCTS.FILLING_ORDER:
                return 'Llenando orden';
            case this.STATUS_PRODUCTS.DISPATCHED:
                return 'Despachado';
            case this.STATUS_PRODUCTS.DELIVERED:
                return 'Entregado';
        }
    }
}
