import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/api/users/user';
import { InputFilePage } from '../parent/InputFilePage';
import { FireStorage } from '../../core/fire-storage/fire.storage';

// Services
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { AuthService } from '../../core/api/auth/auth.service';
import { ValidationUtils } from '../../utils/validation.utils';

// Providers
import { ToastProvider } from '../../providers/toast.provider';
import { StorageProvider } from '../../providers/storage.provider';


@Component({
    selector: 'app-user-register',
    templateUrl: 'user-register.html',
    styleUrls: ['./user-register.scss'],
})

export class UserRegisterPage extends InputFilePage implements OnInit, AfterViewInit {

    googleMaps: any;
    autocompleteService: any;
    places: any = [];
    locationSearch: string;
    user: User = {};
    saving = false;
    buttonDisabled = true;

    constructor(private storageService: StorageProvider,
                private authService: AuthService,
                private toast: ToastProvider,
                protected geolocationService: GeolocationService,
                private route: Router,
                private fireStorage: FireStorage) {
        super(geolocationService);
    }

    ngOnInit() {
        this.storageService.getUserUnregistered()
            .then(user => {
                if (user) {
                    this.user = user;
                    this.user.location = {};
                }
            });
    }

    locationChanged(target: EventTarget) {
        this.buttonDisabled = this.locationSearch !== this.user.location.address;
        this.searchPlace(target, true);
    }

    setPlace(place) {
        this.locationSearch = place.description;
        this.user.location.address = place.description;
        this.user.location.country = place.terms.slice(-1)[0].value;
        this.buttonDisabled = false;
        this.places = [];
    }

    registerUser() {
        const user = this.user;
        if (!user.location || !user.phone) {
            return this.toast.messageErrorWithoutTabs('No puede dejar datos vacios');
        }
        if (!ValidationUtils.validateEmpty(user)) {
            return this.toast.messageErrorWithoutTabs('Todos su información debe estar rellenada');
        }
        if (!ValidationUtils.validatePhone(user.phone)) {
            return this.toast.messageErrorWithoutTabs('Su número de teléfono debe contener entre 8 y 15 dígitos', 2500);
        }
        if (!this.user.location.country || this.user.location.country.trim() === '') {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar la direccion similar a la suya de la lista de sugerencias');
        }
        this.saving = true;
        user.notifications = true;

        this.getBase64Image(user.photoUrl, async (base64image) => {
            const success = await this.fireStorage.saveProfileImage(base64image);
            if (success) {
                this.user.photoUrl = success;
                this.addUser(this.user);
            } else {
                this.saving = false;
                this.toast.messageErrorWithoutTabs('Hemos tenido problemas creando su usuario. Intente nuevamente!', 2500);
                return;
            }
        });
    }

    getBase64Image(URL, callback) {
        let img;
        img = new Image();
        img.onload = (() => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(callback, 'image/png');

        });
        img.setAttribute('crossOrigin', 'anonymous'); //
        img.src = URL;
    }

    private addUser(user: User) {
        this.authService.create(user)
            .then(async response => {
                if (response.passed === true) {
                    await this.storageService.setPagamiUser(response.response);
                    await this.storageService.setLogged(true);
                    await this.toast.messageSuccessWithoutTabs('BIENVENIDO A PAGAMI!', 2500);
                    this.saving = false;
                    await this.route.navigate(['/app/tabs/map/search']);
                } else {
                    this.saving = false;
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas creando su usuario. Intente nuevamente!', 2500);
                }
            });
    }
}
