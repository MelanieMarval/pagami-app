import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-select-icon',
    templateUrl: 'select-icon.html',
    styleUrls: ['select-icon.scss']
})
export class SelectIconPage {

    selectedIcon = 7;

    constructor(
        public toastController: ToastController,
    ) {}

    async saveIconBusiness() {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2000,
            message: 'Registro Exitoso',
            position: 'top',
        });

        await toast.present();
    }
}
