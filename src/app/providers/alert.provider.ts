import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GoogleAuthService } from '../core/google-auth/google-auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlertProvider {

    constructor(private alertController: AlertController,
                private googleAuthService: GoogleAuthService,
                private router: Router
    ) {}

    async alertComingSoon() {
        const alert = await this.alertController.create({
            header: 'Proximamente...',
            message: 'Esta opcion no esta disponible actualmente. <br> Estara habilitada en proximas versiones.',
            buttons: ['Entendido']
        });

        await alert.present();
    }

    async alertUserDisabled(){
        const alert = await this.alertController.create({
            header: 'Su usuario ha sido deshabilitado',
            message: 'Lamentablemente ya no tiene permitido acceder a la aplicacion, por motivo de: blah blah',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: async () => {
                        await this.googleAuthService.singOut();
                        await this.router.navigateByUrl('/tutorial');
                    }
                }
            ]
        });
        await alert.present();
    }
}
