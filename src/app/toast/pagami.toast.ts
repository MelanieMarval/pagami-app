import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PagamiToast {

    constructor(private toastController: ToastController) {
    }

    async messageSuccessWithoutTabs(message: string, duration = 2000) {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration,
            cssClass: 'toast-bottom-custom-without-tabs',
            message,
            position: 'bottom',
        });

        await toast.present();
    }

    async messageSuccessAboveButton(message: string, duration = 2000) {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration,
            cssClass: 'toast-bottom-custom',
            message,
            position: 'bottom',
        });

        await toast.present();
    }

    async messageErrorWithoutTabs(message: string, duration = 2000) {
        const toast = await this.toastController.create({
            color: 'danger',
            duration,
            cssClass: 'toast-bottom-custom-without-tabs',
            header: 'Error!',
            message,
            position: 'bottom',
        });

        await toast.present();
    }

}
