import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonItem, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../core/auth/auth.service';
import { auth } from 'firebase/app';

import { InputFilePage } from '../parent/InputFilePage';
import { getGoogleMaps } from '../parent/MapPage';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfilePage extends InputFilePage implements OnInit, AfterViewInit {

    isLogged = false;
    isEditing = false;
    googleMaps: any;
    autocompleteService: any;
    textSearched = '';
    places: any = [];

    @ViewChild('ionContentEdit', {static: false}) private ionContentEdit: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) private itemLocation: ElementRef;


    constructor(public alertController: AlertController,
                public toastController: ToastController,
                private angularFireAuth: AngularFireAuth,
                private authService: AuthService,
                public zone: NgZone
    ) {
        super();
    }

    ngOnInit() {
        this.textSearched = 'Valencia, Carabobo, Venezuela';
    }

    async ngAfterViewInit() {
        this.googleMaps = await getGoogleMaps(
            'AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s'
        );
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

    async googleSignIn() {
        const googleUser = await Plugins.GoogleAuth.signIn();
        const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
        const fireCredential = await this.angularFireAuth.auth.signInWithCredential(credential);
        const token = await fireCredential.user.getIdToken(false);
        this.authService.singIn(token).then(
            success => {
                alert(success.name);
                console.log(success);
            }, reason => {
                console.log('-> reason', reason);
            }
        );
    }
}
