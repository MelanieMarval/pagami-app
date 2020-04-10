import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { InputFilePage } from '../parent/InputFilePage';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { GoogleAuthService } from '../../core/google-auth/google-auth.service';
import { Router } from '@angular/router';
import { ToastProvider } from '../../providers/toast.provider';
import { StorageProvider } from '../../providers/storage.provider';
import { User } from '../../core/api/users/user';
import { AuthService } from '../../core/api/auth/auth.service';
import { FireStorage } from '../../core/fire-storage/fire.storage';
import { ValidationUtils } from '../../utils/validation.utils';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfilePage extends InputFilePage implements OnInit {

    isEditing = false;
    user: User = {location: {}};
    updating = false;

    constructor(
        private router: Router,
        private googleAuthService: GoogleAuthService,
        private alertController: AlertController,
        private toast: ToastProvider,
        private fireStorage: FireStorage,
        protected geolocationService: GeolocationService,
        private storageService: StorageProvider,
        private authService: AuthService,
    ) {
        super(geolocationService);
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
        this.previewUrl = this.user.photoUrl;
    }

    setPlace(place) {
        console.log('-> place', place);
        this.user.location.address = place.description;
        this.user.location.country = place.terms.slice(-1)[0].value;
        this.places = [];
    }

    editProfile() {
        if (this.isEditing) {
            this.isEditing = false;
            this.updating = false;
        } else {
            this.isEditing = true;
        }
    }

    validateForm() {
        if (!ValidationUtils.validateEmpty(this.user)) {
            return this.toast.messageErrorWithoutTabs('Todos su informacion debe estar rellenada');
        }
        if (!ValidationUtils.validatePhone(this.user.phone)) {
            return this.toast.messageErrorWithoutTabs('Su numero de telefono debe contener minimo 8 digitos y menos de 15', 2500);
        }
        if (this.previewUrl !== this.user.photoUrl) {
            this.saveImage();
        } else {
            this.updateUser();
        }
    }

    async saveImage() {
        this.updating = true;
        const success = await this.fireStorage.saveProfileImage(this.fileData);
        if (success) {
            this.user.photoUrl = success;
            this.updateUser();
        } else {
            this.errorUpdating();
        }
    }

    updateUser() {
        this.updating = true;
        this.authService.update(this.user)
            .then(async success => {
                if (success.passed === true) {
                    console.log('-> success.response', success.response);
                    await this.storageService.setPagamiUser(success.response);
                    this.user = await this.storageService.getPagamiUser();
                    this.updating = false;
                    this.isEditing = false;
                    this.toast.messageSuccessWithoutTabs('Informacion actualizada con exito');
                } else {
                    this.errorUpdating();
                }
            });
    }

    errorUpdating() {
        this.updating = false;
        this.isEditing = false;
        this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
    }

    async deleteAccountConfirm() {
        const alert = await this.alertController.create({
            header: 'Eliminacion de cuenta',
            message: 'Si eliminas tu cuenta toda tu información se perderá y no podrás recuperla',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Eliminar de todas formas',
                    cssClass: 'alert-confirm',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ],
            cssClass: 'ion-color-pagami-surface'
        });

        await alert.present();
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
