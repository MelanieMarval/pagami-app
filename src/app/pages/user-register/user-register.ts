import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Services
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/api/users/user';
import { AuthService } from '../../core/api/auth/auth.service';
import { ToastProvider } from '../../providers/toast.provider';
import { InputFilePage } from '../parent/InputFilePage';
import { ValidationUtils } from '../../utils/validation.utils';

@Component({
    selector: 'app-user-register',
    templateUrl: 'user-register.html',
    styleUrls: ['./user-register.scss'],
})

export class UserRegisterPage extends InputFilePage implements OnInit, AfterViewInit {

    googleMaps: any;
    autocompleteService: any;
    places: any = [];
    user: User = {};
    saving = false;

    constructor(private storageService: StorageService,
                private authService: AuthService,
                private toast: ToastProvider,
                protected geolocationService: GeolocationService,
                private route: Router) {
        super(geolocationService);
    }

    ngOnInit() {
        this.storageService.getUserUnregistered()
            .then(user => user ? this.user = user : '');
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
        if (!ValidationUtils.validateEmpty(user)) {
            return this.toast.messageErrorWithoutTabs('Todos su información debe estar rellenada');
        }
        // if (user.name.trim() === '' || user.lastname.trim() === '' || user.location.trim() === '' || user.phone.trim() === '' || user.email.trim() === '') {
        //     return this.toast.messageErrorWithoutTabs('Todos su información debe estar rellenada');
        // }
        if (!ValidationUtils.validatePhone(user.phone)) {
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
                    await this.route.navigate(['/app/tabs/map']);
                } else {
                    this.saving = false;
                    return this.toast.messageErrorWithoutTabs('Hemos tenido problemas creando su usuario. Intente nuevamente!', 2500);
                }
            });
    }

}
