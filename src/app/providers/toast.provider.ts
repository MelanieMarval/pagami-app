import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastProvider {

    constructor(private toastController: ToastController) {
    }

    async messageSuccessBottom(message: string, duration = 2000) {
        const toast = await this.toastController.create({
            message,
            duration,
            color: 'pagami-surface',
            position: 'bottom',
        });

        await toast.present();
    }

    async messageInfoForMap(message: string, duration = 5000) {
        const toast = await this.toastController.create({
            message,
            duration,
            cssClass: 'toast-bottom-custom-for-map',
            color: 'pagami-surface',
            position: 'bottom',
        });

        await toast.present();
    }

    async messageSuccessWithoutTabs(message: string, duration = 2000, color = 'pagami-surface') {
        const toast = await this.toastController.create({
            message,
            duration,
            color,
            cssClass: 'toast-bottom-custom-without-tabs',
            position: 'bottom',
        });

        await toast.present();
    }

    async messageSuccessAboveButton(message: string, duration = 2000, color = 'pagami-surface') {
        const toast = await this.toastController.create({
            message,
            duration,
            color,
            cssClass: 'toast-bottom-custom',
            position: 'bottom',
        });

        await toast.present();
    }

    async messageErrorWithoutTabs(message: string, duration = 2500, header = 'Error!') {
        const toast = await this.toastController.create({
            header,
            message,
            duration,
            color: 'danger',
            cssClass: 'toast-bottom-custom-without-tabs',
            position: 'bottom',
        });

        await toast.present();
    }

    async messageErrorAboveButton(message: string, duration = 2500, header = 'Error!') {
        const toast = await this.toastController.create({
            header,
            message,
            duration,
            color: 'danger',
            cssClass: 'toast-bottom-custom',
            position: 'bottom',
        });

        await toast.present();
    }


}
