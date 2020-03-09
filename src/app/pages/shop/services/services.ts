import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-services',
    templateUrl: 'services.html',
    styleUrls: ['services.scss']
})
export class ServicesPage {
    constructor( public alertController: AlertController ) {}

    async selectService() {
        const alert = await this.alertController.create({
            header: 'Leche south 1 L!',
            inputs: [
                {
                    name: 'description',
                    id: 'paragraph',
                    type: 'textarea',
                    placeholder: 'Describe lo que necesitas'
                },
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
                    text: 'Solicitar Servicio',
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
