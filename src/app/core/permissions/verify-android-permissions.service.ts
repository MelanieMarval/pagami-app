import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { RequestAndroidPermissionsService } from './request-android-permissions.service';

@Injectable({
    providedIn: 'root'
})
export class VerifyAndroidPermissionsService {

    constructor(private alertController: AlertController,
                private openNativeSettings: OpenNativeSettings,
                private androidPermissionsService: RequestAndroidPermissionsService) {
    }

    async checkPermissions() {
        const response = await this.need();
        console.log('-> response', response);
        if (response) {
            await this.alertOpenSettings(response, () => {
                this.checkPermissions();
            });
        }
    }

    need(): Promise<any> {
        return new Promise(async resolve => {
            const resLocation = await this.androidPermissionsService.accessLocation();
            if (resLocation) {
                const resActiveGPS = await this.androidPermissionsService.checkActiveGPS();
                if (resActiveGPS) {
                    resolve(false);
                } else {
                    resolve({
                        header: 'Es necesario que mantegas activado tu GPS para el buen funcionamiento de la app',
                        message: 'Si decides ir a la configuración busca y marca la opcion activar o acceso a la ubicacion',
                        open: 'location'
                    });
                }
            } else {
                resolve({
                    header: 'Los permisos de ubicación (GPS) son necesarios para el buen funcionamiento de la app',
                    message: 'Si decides ir a la configuración busca permisos > rechazados > ubicación y permitir',
                    open: 'application_details'
                });
            }
        });
    }

    async alertOpenSettings(data: any, tryAgain?: any) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: data.header,
            subHeader: 'Ningún dato personal será compartido',
            message: data.message,
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Configuración',
                    handler: () => {
                        this.openNativeSettings.open(data.open).then(() => {
                            tryAgain();
                        }, (error) => {
                            console.error('The following error occurred: ', error);
                        });
                    },
                },
                {
                    text: 'Preguntar de nuevo',
                    handler: () => {
                        tryAgain();
                    },
                },
            ],
        });

        await alert.present();
    }


}
