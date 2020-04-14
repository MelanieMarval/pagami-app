import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertProvider {

    constructor(private alertController: AlertController) {
    }

    async alertComingSoon() {
        const alert = await this.alertController.create({
            header: 'Proximamente...',
            message: 'Esta opcion no esta disponible actualmente. <br> Estara habilitada en proximas versiones.',
            buttons: ['Entendido']
        });

        await alert.present();
    }


}
