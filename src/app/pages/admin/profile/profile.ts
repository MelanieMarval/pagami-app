import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { InputFilePage } from '../../parent/InputFilePage';
import { User } from '../../../core/api/users/user';
// Services
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { GoogleAuthService } from '../../../core/google-auth/google-auth.service';
import { AuthService } from '../../../core/api/auth/auth.service';
// Provider
import { StorageProvider } from '../../../providers/storage.provider';
import { ToastProvider } from '../../../providers/toast.provider';
import { FireStorage } from '../../../core/fire-storage/fire.storage';


@Component({
    selector: 'app-admin-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfileAdminPage extends InputFilePage implements OnInit {

    isEditing = false;
    user: User = {location: {}};
    updating = false;

    constructor(
        protected geolocationService: GeolocationService,
        private googleAuthService: GoogleAuthService,
        private router: Router,
        private alertController: AlertController,
        private toast: ToastProvider,
        private fireStorage: FireStorage,
        private storageService: StorageProvider,
        private authService: AuthService,
    ) {
        super(geolocationService);
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
    }

    updateUser() {
        this.updating = true;
        this.authService.update(this.user)
            .then(async success => {
                if (success.passed === true) {
                    await this.storageService.setPagamiUser(success.response);
                    this.user = await this.storageService.getPagamiUser();
                    this.updating = false;
                    this.isEditing = false;
                    this.toast.messageDefault('Informacion actualizada con exito');
                } else {
                    this.updating = false;
                    this.isEditing = false;
                    this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
                }
            });
    }

    async closeSessionConfirm() {
        const alert = await this.alertController.create({
            header: 'Cerrar Sesión',
            message: '¿Seguro que desea cerrar su sesión?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel',
                    handler: () => {
                        // close
                    }
                }, {
                    text: 'Si, Cerrar',
                    cssClass: 'alert-confirm',
                    handler: () => {
                        this.closeSession();
                    }
                }
            ],
            cssClass: 'ion-color-pagami-surface'
        });

        await alert.present();
    }

    async closeSession() {
        await this.googleAuthService.singOut();
        await this.router.navigateByUrl('/tutorial');
    }

}
