import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, ToastController } from '@ionic/angular';

import { InputFilePage } from '../parent/InputFilePage';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { GoogleAuthService } from '../../core/google-auth/google-auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfilePage extends InputFilePage implements OnInit, AfterViewInit {

    isEditing = false;
    googleMaps: any;
    autocompleteService: any;
    textSearched = '';
    places: any = [];

    @ViewChild('ionContentEdit', {static: false}) private ionContentEdit: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) private itemLocation: ElementRef;

    constructor(
                private router: Router,
                private googleAuthService: GoogleAuthService,
                private alertController: AlertController,
                private toastController: ToastController,
                private geolocationService: GeolocationService,
                public zone: NgZone
    ) {
        super();
    }

    ngOnInit() {
        this.textSearched = 'Valencia, Carabobo, Venezuela';
    }

    async ngAfterViewInit() {
        this.googleMaps = await this.geolocationService.getGoogleMaps();
        this.autocompleteService = new this.googleMaps.places.AutocompleteService();
    }


    searchPlace() {
        if (this.textSearched.length > 0) {
            if (this.itemLocation.nativeElement.classList.contains('item-has-focus') === true) {
                const config = {
                    types: ['geocode'],
                    input: this.textSearched
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
        this.textSearched = await place;
        this.places = [];
    }

    editProfile() {
        if (this.isEditing) {
            this.isEditing = false;

        } else {
            this.isEditing = true;
            this.previewUrl = 'assets/img/avatar-profile.jpg';
            console.log('Vas a editar tu perfil');
        }
    }

    async saveProfile() {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2000,
            cssClass: 'toast-bottom-custom-without-tabs',
            message: 'Cambios guardados exitosamente',
            position: 'bottom',
        });

        this.isEditing = false;
        await toast.present();
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
        this.router.navigateByUrl('/tutorial');
    }
}
