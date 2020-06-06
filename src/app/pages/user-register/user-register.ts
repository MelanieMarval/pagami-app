import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/api/users/user';
import { FireStorage } from '../../core/fire-storage/fire.storage';
import { Sim } from '@ionic-native/sim/ngx';

// Services
import { AuthService } from '../../core/api/auth/auth.service';
import { ValidationUtils } from '../../utils/validation.utils';

// Providers
import { ToastProvider } from '../../providers/toast.provider';
import { StorageProvider } from '../../providers/storage.provider';
import { PlacesService } from '../../core/api/places/places.service';
import { Country } from '../../core/api/places/country';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
    selector: 'app-user-register',
    templateUrl: 'user-register.html',
    styleUrls: ['./user-register.scss'],
})

export class UserRegisterPage implements OnInit {

    places: any = [];
    user: User = {};
    saving = false;
    buttonDisabled = false;
    countries: Country[];
    country: Country;
    address: string;

    constructor(private storageService: StorageProvider,
                private authService: AuthService,
                private toast: ToastProvider,
                private route: Router,
                private fireStorage: FireStorage,
                private placesService: PlacesService,
                private sim: Sim) {
    }

    async ngOnInit() {
        await this.storageService.getUserUnregistered()
            .then(user => {
                if (user) {
                    this.user = user;
                    this.user.location = {};
                }
            });
        await this.placesService.getAllCountries().then(value => {
            this.countries = value;
            this.country = this.countries.find(cc => cc.code === 'CO');
            this.user.phoneCode = this.country.dial_code;
        });
        await this.sim.getSimInfo().then((value: any) => {
            if (value.countryCode) {
                const simCountry = this.countries.find(cc => cc.code === value.countryCode.toUpperCase());
                if (simCountry) {
                    this.country = simCountry;
                    this.user.phoneCode = this.country.dial_code;
                }
            }
        });
    }

    async registerUser() {
        const user = this.user;
        if (!user.phone) {
            return this.toast.messageErrorWithoutTabs('No puede dejar datos vacios');
        }
        if (!ValidationUtils.validateEmpty(user, ['location'])) {
            return this.toast.messageErrorWithoutTabs('Todos su información debe estar rellenada');
        }
        if (!ValidationUtils.validatePhone(user.phone)) {
            return this.toast.messageErrorWithoutTabs('Su número de teléfono debe contener entre 8 y 15 dígitos', 2500);
        }
        if (!this.country) {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar su pais');
        }
        this.saving = true;
        user.notifications = true;
        user.location.country = this.country.name;
        user.location.code = this.country.code;
        if (this.address && this.address.length > 0) {
            user.location.address = this.address;
        }

        const base64image = await this.convertToBase64(user.photoUrl);
        const success = await this.fireStorage.saveProfileImage(base64image);
        if (success) {
            this.user.photoUrl = success;
            this.addUser(this.user);
        } else {
            this.saving = false;
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas creando su usuario. Intente nuevamente!', 2500);
            return;
        }
    }

    convertToBase64(photoUrl): Promise<any> {
        const self = this;
        return new Promise(resolve => {
            self.getBase64Image(photoUrl, async (base64image) => {
                resolve(base64image);
            });
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

    addUser(user: User) {
        const self = this;
        this.authService.create(user)
            .then(async response => {
                if (response.passed === true) {
                    await this.storageService.setPagamiUser(response.response);
                    await this.storageService.setLogged(true);
                    await this.toast.messageSuccessWithoutTabs('BIENVENIDO A PAGAMI!', 2500);
                    await this.route.navigate(['/app/tabs/map/search']);
                } else {
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas creando su usuario. Intente nuevamente!', 2500);
                }
            }).finally(() => {
                self.saving = false;
            });
    }

    countryChange($event: { component: IonicSelectableComponent; value: any }) {
        this.user.phoneCode = this.country.dial_code;
    }
}
