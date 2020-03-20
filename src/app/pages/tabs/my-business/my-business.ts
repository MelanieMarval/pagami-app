import {Component} from '@angular/core';
import {InputFilePage} from '../../parent/InputFilePage';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-my-business',
    templateUrl: 'my-business.html',
    styleUrls: ['my-business.scss']
})
export class MyBusinessPage  extends InputFilePage{

    isRegister = true;
    isEditing = false;

    constructor(
        public toastController: ToastController,
    ) {
        super();
    }

    editBusiness() {
        this.isEditing = true;
        this.previewUrl = 'assets/img/avatar-business.jpg';
    }

    cancelEditbusiness() {
        this.isEditing = false;
    }

    async saveBusiness() {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2000,
            message: 'Cambios guardados exitosamente',
            position: 'top',
        });

        await toast.present();
        this.isEditing = false;
    }

}
