import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GoogleAuthService } from '../core/google-auth/google-auth.service';
import { Router } from '@angular/router';

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

    async alertChangedUserStatus(status) {

        const alert = await this.alertController.create({
            header: 'Su usuario ha sido ' + status,
            message: status === 'deshabilitado' ? 'Lamentablemente ya no tiene permitido acceder a la aplicacion. Lamentamos las molestias.' :
                    status === 'ascendido' ? 'Ahora tendra acceso al panel administrativo y tendra control sobre los diferentes lugares y usuario registrados' :
                    'Ya no tendra acceso al panel administrativo, ni a las estadisticas mostradas en este. Ahora es un usuario normal',
            buttons: ['Aceptar']
        });
        await alert.present();
    }

    async alertConfirmDelete(header = '¿Esta seguro de que desea eliminarlo?',
                             message = 'Esta opcion no podra ser regresada'): Promise<boolean> {
        return new Promise(async (resolve) => {

            const alert = await this.alertController.create({
                header,
                message,
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary'
                    }, {
                        text: 'Si, eliminar',
                        handler: () => {
                            resolve();
                        }
                    }
                ]
            });
            await alert.present();
        });

    }
}
