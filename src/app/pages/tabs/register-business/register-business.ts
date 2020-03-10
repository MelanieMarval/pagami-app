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
      color: 'pagami-surface',
      duration: 2000,
      message: 'Ubicación guardada exitosamente',
      position: 'top',
    });

    await toast.present();
    this.beforeSaveLocation = false;
  }

}
