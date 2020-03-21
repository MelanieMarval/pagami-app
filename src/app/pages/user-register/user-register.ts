import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../core/storage/storage.service';
import { IonContent, ToastController } from '@ionic/angular';
import { User } from '../../core/users/user';
import { GeolocationService } from '../../core/geolocation/geolocation.service';

@Component({
    selector: 'app-user-register',
    templateUrl: 'user-register.html',
    styleUrls: ['./user-register.scss'],
})

export class UserRegisterPage implements OnInit, AfterViewInit {

    googleMaps: any;
    autocompleteService: any;
    textSearched = '';
    places: any = [];
    user: User = {};

    @ViewChild('ionContent', {static: false}) private ionContent: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) private itemLocation: ElementRef;

    constructor(private storageService: StorageService,
                private toastController: ToastController,
                private geolocationService: GeolocationService) {
    }

    ngOnInit() {
        this.storageService.getUserUnregistered()
            .then(user => {
                if (user) {
                    this.user = user;
                    console.log('-> user', user);
                }
            });
    }

    async ngAfterViewInit() {
        this.googleMaps = await this.geolocationService.getGoogleMaps();
        this.autocompleteService = new this.googleMaps.places.AutocompleteService();
    }

    searchPlace(e) {
        if (e.target.value.length > 0) {
            if (this.itemLocation.nativeElement.classList.contains('item-has-focus') === true) {
                const config = {
                    types: ['geocode'],
                    input: e.target.value
                };
                this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
                    if (status === this.googleMaps.places.PlacesServiceStatus.OK && predictions) {
                        this.places = [];
                        predictions.forEach((prediction) => {
                            this.places.push(prediction);
                        });
                    }
                    this.ionContent.scrollToBottom(200);
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

    async registerUser() {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2000,
            cssClass: 'toast-bottom-custom-without-tabs',
            message: 'Cambios guardados exitosamente',
            position: 'bottom',
        });

        await toast.present();
    }

}
