import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-select-icon',
    templateUrl: 'select-icon.html',
    styleUrls: ['select-icon.scss']
})
export class SelectIconPage {

    selectedIcon = 0;

    constructor(
        public toastController: ToastController,
        private route: Router,
    ) {}

    async saveIconBusiness() {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2500,
            message: 'Empresa registrada con exito',
            cssClass: 'toast-bottom-custom-2',
            position: 'bottom',
        });

        await toast.present();
        await this.route.navigate(['/app/tabs/wallet/activity']);
    }
}
