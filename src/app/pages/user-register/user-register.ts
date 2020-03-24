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
        const user = this.user;
        console.log('-> user', user);
        if (!user.location || !user.phone) {
            return this.toast.messageErrorWithoutTabs('No puede dejar datos vacios');
        }
        if (user.name.trim() === '' || user.lastname.trim() === '' || user.location.trim() === '' || user.phone.trim() === '' || user.email.trim() === '') {
            return this.toast.messageErrorWithoutTabs('Todos su información debe estar rellenada');
        }
        if (user.phone.length < 8 || user.phone.length > 15) {
            return this.toast.messageErrorWithoutTabs('Su número de teléfono debe contener entre 8 y 15 dígitos', 2500);
        }
        this.saving = true;
        user.fillOrders = true;
        user.notifications = true;

        this.authService.create(user)
            .then(async response => {
                if (response.passed === true) {
                    await this.storageService.setPagamiUser(response.response);
                    await this.toast.messageSuccessWithoutTabs('BIENVENIDO A PAGAMI!', 2500);
                    this.saving = false;
                    this.route.navigate(['/app/tabs/close-to-me']);
                }
            });
    }

}
