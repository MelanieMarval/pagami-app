import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Services
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/api/users/user';
import { AuthService } from '../../core/api/auth/auth.service';
import { PagamiToast } from '../../toast/pagami.toast';

@Component({
    selector: 'app-user-register',
    templateUrl: 'user-register.html',
    styleUrls: ['./user-register.scss'],
})

export class UserRegisterPage implements OnInit, AfterViewInit {

    googleMaps: any;
    autocompleteService: any;
    places: any = [];
    user: User = {};
    saving = false;

    @ViewChild('ionContent', {static: false}) private ionContent: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) private itemLocation: ElementRef;

    constructor(private storageService: StorageService,
                private authService: AuthService,
                private toast: PagamiToast,
                private geolocationService: GeolocationService,
                private route: Router) {
    }

    ngOnInit() {
        this.storageService.getUserUnregistered()
            .then(user => user ? this.user = user : '');
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
                    this.ionContent.scrollToBottom(200).then();
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

    registerUser() {
        this.saving = true;
        this.user.fillOrders = true;
        this.user.notifications = true;

        this.authService.create(this.user)
            .then(async response => {
                if (response.passed === true) {
                    await this.storageService.setPagamiUser(response.response);
                    await this.storageService.setLogged(true);
                    this.saving = false;
                    await this.toast.messageSuccessWithoutTabs('BIENVENIDO A PAGAMI!', 2500);
                    this.route.navigate(['/app/tabs/close-to-me']);
                }
            });
    }

}
