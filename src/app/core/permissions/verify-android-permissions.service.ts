import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { RequestAndroidPermissionsService } from './request-android-permissions.service';
import { Plugins } from '@capacitor/core';

const {Device} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class VerifyAndroidPermissionsService {

    constructor(private alertController: AlertController,
                private openNativeSettings: OpenNativeSettings,
                private androidPermissionsService: RequestAndroidPermissionsService) {
    }

    async checkPermissions() {
        const info = await Device.getInfo();

        if (info.platform !== 'web') {
            const response = await this.need();
            console.log('-> response', response);
            if (response) {
                await this.alertOpenSettings(response, () => {
                    this.checkPermissions();
                });
            }
        }
    }

    private need(): Promise<any> {
        return new Promise(async resolve => {
            const resLocation = await this.androidPermissionsService.accessLocation();
            if (resLocation) {
                resolve(false);
            } else {
                resolve('Los datos de ubicación (GPS) son necesarios para el buen funcionamiento de la app');
            }
        });
    }

    private async alertOpenSettings(subHeader: string, tryAgain?: any) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Ningún dato personal será compartido',
            subHeader,
            message: 'Si decides ir a la configuración busca permisos > rechazados > ubicación y permitir',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Configuración',
                    handler: () => {
                        this.openNativeSettings.open('application_details').then(() => {
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
