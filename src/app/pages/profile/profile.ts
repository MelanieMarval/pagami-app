import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { InputFilePage } from '../parent/InputFilePage';
// Services
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { GoogleAuthService } from '../../core/google-auth/google-auth.service';
import { AuthService } from '../../core/api/auth/auth.service';
import { User } from '../../core/api/users/user';
// Providers
import { ToastProvider } from '../../providers/toast.provider';
import { StorageProvider } from '../../providers/storage.provider';

import { FireStorage } from '../../core/fire-storage/fire.storage';
import { ValidationUtils } from '../../utils/validation.utils';
import { CompressImageProvider } from '../../providers/compress-image.provider';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfilePage extends InputFilePage implements OnInit {

    isEditing = false;
    user: User = {location: {}};
    userEdit: User = {location: {}};
    updating = false;
    locationSelected = true;

    constructor(
        private router: Router,
        private alertController: AlertController,
        private toast: ToastProvider,
        private storageService: StorageProvider,
        private compressImage: CompressImageProvider,
        private fireStorage: FireStorage,
        private googleAuthService: GoogleAuthService,
        private authService: AuthService,
        protected geolocationService: GeolocationService,
    ) {
        super(geolocationService);
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
        this.previewUrl = this.user.photoUrl;
    }

    setPlace(place) {
        this.user.location.address = place.description;
        this.user.location.country = place.terms.slice(-1)[0].value;
        this.places = [];
        setTimeout(() => {
            this.locationSelected = true;
        }, 500);
    }

    editProfile() {
        if (this.isEditing) {
            this.isEditing = false;
            this.updating = false;
        } else {
            this.isEditing = true;
            this.userEdit = Object.assign({}, this.user);
            setTimeout(() => {
                this.locationSelected = true;
            }, 500);
        }
    }

    locationChanged(target: EventTarget) {
        this.locationSelected = false;
        this.searchPlace(target, true);
    }

    validateForm() {
        if (!ValidationUtils.validateEmpty(this.userEdit)) {
            return this.toast.messageErrorWithoutTabs('Todos su informacion debe estar rellenada');
        }
        if (!ValidationUtils.validatePhone(this.userEdit.phone)) {
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
            this.userEdit.photoUrl = success;
            this.updateUser();
        } else {
            this.errorUpdating();
        }
    }

    updateUser() {
        this.updating = true;
        this.authService.update(this.userEdit)
            .then(async success => {
                if (success.passed === true) {
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
                        this.updating = true;
                        this.authService.delete()
                            .then(success => {
                                if (success.passed) {
                                    this.toast.messageSuccessWithoutTabs('Su cuenta ha sido eliminada. Ya no podra acceder a la aplicacion', 3500);
                                    this.closeSession();
                                }
                                this.updating = false;
                            }).catch(() => {
                                this.toast.messageErrorWithoutTabs('El proceso no pudo completarse');
                                this.updating = false;
                            });
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


    validateImage($event: Event) {
        if (!ValidationUtils.validateImage($event)) {
            this.toast.messageErrorWithoutTabs('Formato de imágen no válido, por favor seleccione otra.', 3000);
        } else {
            this.chargeImage($event);
        }
    }
}
