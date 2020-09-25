import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders-summary',
    templateUrl: 'summary.html',
    styleUrls: ['summary.scss']
})
export class SummaryPage {

    constructor(private alertController: AlertController,
                private route: Router,) {
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
                    cssClass: 'secondary',
                    handler: () => {
                        this.confirmDeleteProduct();
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


    cancelOrder() {
        // pedido no realizado
        if (true) {
            this.confirmCancelOrder('Cancelación de pedido', 'Estas seguro que quieres cancelar el pedido actual?', true);
        } else {
            // ya la orden fue depachada
            this.confirmCancelOrder('Orden despachada', 'Las ordenes despachadas no se pueden cancelar');
        }
    }

    async confirmCancelOrder(header: string, message: string, buttons?: boolean) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons: !buttons ? [] : [
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

    async confirmDeleteProduct() {
        const alert = await this.alertController.create({
            header: 'Eliminar producto',
            message: 'Esta seguro de que quiere eliminar este producto de su orden?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel'
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
