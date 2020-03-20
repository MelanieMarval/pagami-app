import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { InputFilePage } from '../parent/InputFilePage';
import { getGoogleMaps } from '../parent/MapPage';
import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


// @ts-ignore
import places = google.maps.places;
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
})
export class ProfilePage extends InputFilePage {

    isEditing = false;
    googleMaps;
    autocomplete = { input: '' };
    autocompleteItems = [];
    location: any;
    placeid: any;

    constructor(public alertController: AlertController,
                public toastController: ToastController,
                private angularFireAuth: AngularFireAuth,
                private authService: AuthService,
                public zone: NgZone
    ) {
        super();
    }


    async updateSearchResults() {
        // tslint:disable-next-line:triple-equals
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        // places.PlacesService.getDetai({ input: this.autocomplete.input },
        //     (predictions, status) => {
        //         this.autocompleteItems = [];
        //         this.zone.run(() => {
        //             console.log(predictions);
        //             predictions.forEach((prediction) => {
        //                 this.autocompleteItems.push(prediction);
        //             });
        //         });
        //     });
    }
    selectSearchResult(item) {
        console.log(item);
        this.location = item;
        this.placeid = this.location.place_id;
        console.log('placeid' + this.placeid);
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

    getAddress(place) {
        console.log(place);
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
