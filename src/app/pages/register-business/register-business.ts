import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register-business',
  templateUrl: 'register-business.html',
  styleUrls: ['register-business.scss']
})
export class RegisterBusinessPage {

  beforeSaveLocation = true;

  constructor(
      public toastController: ToastController,
  ) {}

  async saveLocation() {


    const toast = await this.toastController.create({
      color: 'pagami-background-2nd',
      duration: 3000,
      message: 'Ubicación guardada exitosamente',
      position: 'top',
    });

    await toast.present();
    this.beforeSaveLocation = false;
  }

}
