import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';

import { InputFilePage } from '../parent/InputFilePage';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { GoogleAuthService } from '../../core/google-auth/google-auth.service';
import { Router } from '@angular/router';
import { PagamiToast } from '../../toast/pagami.toast';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/api/users/user';
import { AuthService } from '../../core/api/auth/auth.service';
import { FireStorage } from '../../core/fire-storage/fire.storage';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfilePage extends InputFilePage implements OnInit, AfterViewInit {

    isEditing = false;
    user: User = {};
    googleMaps: any;
    autocompleteService: any;
    places: any = [];
    updating = false;

    @ViewChild('ionContentEdit', {static: false}) private ionContentEdit: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) private itemLocation: ElementRef;

    constructor(
        private router: Router,
        private googleAuthService: GoogleAuthService,
        private alertController: AlertController,
        private toast: PagamiToast,
        private fireStorage: FireStorage,
        private geolocationService: GeolocationService,
        private storageService: StorageService,
        private authService: AuthService,
    ) {
        super();
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
        this.previewUrl = this.user.photoUrl;
    }

    async ngAfterViewInit() {
        this.googleMaps = await this.geolocationService.getGoogleMaps();
        this.autocompleteService = new this.googleMaps.places.AutocompleteService();
    }


    searchPlace() {
        if (this.user.location.length > 0) {
            if (this.itemLocation.nativeElement.classList.contains('item-has-focus') === true) {
                const config = {
                    types: ['geocode'],
                    input: this.user.location
                };
                this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
                    if (status === this.googleMaps.places.PlacesServiceStatus.OK && predictions) {
                        this.places = [];
                        predictions.forEach((prediction) => {
                            this.places.push(prediction);
                        });
                    }
                    this.ionContentEdit.scrollToBottom(200);
                });
            } else {
                this.places = [];
            }
        } else {
            this.places = [];
        }
    }

    async setPlace(place) {
        console.log('-> place', place);
        this.user.location = await place;
        this.places = [];
    }

    editProfile() {
        if (this.isEditing) {
            this.isEditing = false;
            this.updating = false;
        } else {
            this.isEditing = true;
            this.previewUrl = this.user.photoUrl;
            console.log('Vas a editar tu perfil');
        }
    }

    saveProfile() {
        const user = this.user;
        if (user.name.trim() === '' || user.lastname.trim() === '' || user.location.trim() === '' || user.phone.trim() === '' || user.email.trim() === '') {
            return this.toast.messageErrorWithoutTabs('Todos su informacion debe estar rellenada');
        }
        if (user.phone.length < 8 || user.phone.length > 15) {
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
