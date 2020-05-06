import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputFilePage } from '../parent/InputFilePage';
import { FireStorage } from '../../core/fire-storage/fire.storage';
import { ValidationUtils } from '../../utils/validation.utils';
// Services
import { GeolocationService } from '../../core/geolocation/geolocation.service';
// Providers
import { StorageProvider } from '../../providers/storage.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { UserIntentProvider } from '../../providers/user-intent.provider';
import { AlertController } from '@ionic/angular';
import { PlacesService } from '../../core/api/places/places.service';
import { Place } from '../../core/api/places/place';
import { PLACES } from '../../utils/Const';

@Component({
    selector: 'app-business-details',
    templateUrl: 'business-details.html',
    styleUrls: ['business-details.scss']
})
export class BusinessDetailsPage extends InputFilePage implements OnInit {

    place: Place = {latitude: 0, longitude: 0};
    saving = false;
    isStore = false;
    isService = false;
    dialCode = '';

    constructor(private storageService: StorageProvider,
                private placeService: PlacesService,
                private route: Router,
                private toast: ToastProvider,
                private fireStorage: FireStorage,
                private storageInstance: UserIntentProvider,
                protected geolocationService: GeolocationService,
                private alertController: AlertController) {
        super(geolocationService);
    }

    ngOnInit() {
        this.setupData(this.storageInstance.placeToEdit);
    }

    async setupData(place: Place) {
        this.place = place;
        if (!this.place.location) {
            this.getAddress(place.latitude, place.longitude);
        }
        this.previewUrl = this.place.photoUrl ? this.place.photoUrl : undefined;
        if (this.place.type === PLACES.TYPE.STORE) {
            this.isStore = true;
        }
        if (this.place.type === PLACES.TYPE.SERVICE) {
            this.isService = true;
        }
        this.dialCode = await this.placeService.getDialCode(this.place.location.acronym);
        if (!this.place.phone) {
            this.place.phone = this.dialCode;
        }
        if (!this.place.whatsapp) {
            this.place.whatsapp = this.dialCode;
        }
    }

    getAddress(lat: number, lng: number) {
        this.placeService.getPlaceByGeocode(lat, lng)
            .then(results => {
                this.mapLocation(results.results);
            });
    }

    async mapLocation(address: object) {
        try {
            const infoPlace = address[0].address_components;
            this.place.location = {
                addressLine: address[0].formatted_address,
                postalCode: infoPlace.slice(-1)[0].long_name,
                city: infoPlace.slice(-5)[0].long_name,
                state: infoPlace.slice(-3)[0].long_name,
                country: infoPlace.slice(-2)[0].long_name,
                acronym: infoPlace.slice(-2)[0].short_name,
            };
        } catch (e) {
            const alert = await this.alertController.create({
                header: 'ha ocurrido un error!',
                message: 'No se ha podido extraer correctamente la informacion, intente nuevamente',
                buttons: [
                    {
                        text: 'Reintentar',
                        handler: () => {
                            this.getAddress(this.place.latitude, this.place.longitude);
                        }
                    }
                ]
            });
            await alert.present();
        }
    }

    selectTypeStore() {
        this.place.type = PLACES.TYPE.STORE;
        this.isService = false;
    }

    selectTypeService() {
        this.place.type = PLACES.TYPE.SERVICE;
        this.isStore = false;
    }

    validateForm() {
        const business = this.place;
        if (!business.location.address || !business.name || !this.place.type || !business.phone) {
            return this.toast.messageErrorWithoutTabs('Toda su informacion debe estar rellenada');
        }
        if (!ValidationUtils.validateEmpty(this.place, ['photoURL', 'icon', 'website'])) {
            return this.toast.messageErrorWithoutTabs('Toda su informacion debe estar rellenada');
        }
        if (!ValidationUtils.validatePhone(business.phone)) {
            this.toast.messageErrorWithoutTabs('Su número de teléfono debe contener minimo 8 digitos y menos de 15');
            return;
        }
        if (!this.place.samePhone && business.whatsapp.length > 15 && business.whatsapp !== this.dialCode) {
            this.toast.messageErrorWithoutTabs('Su número de Whatsapp es incorrecto');
            return;
        }
        if (!this.previewUrl) {
            return this.toast.messageErrorWithoutTabs('Debe agregar una fotografia');
        } else {
            if (this.previewUrl !== this.place.photoUrl) {
                this.saveImage();
            } else {
                this.navigateToSelectIcon();
            }
        }
    }

    async saveImage() {
        this.saving = true;
        const success = await this.fireStorage.saveBusinessImage(this.fileData);
        if (success) {
            this.place.photoUrl = success;
            this.previewUrl = success;
            this.navigateToSelectIcon();
        } else {
            this.toast.messageErrorWithoutTabs('No se ha podido guardar su imagen. Intente de nuevo!');
            this.saving = false;
        }
    }

    navigateToSelectIcon() {
        this.saving = true;
        this.place.allowHome = false;
        if (this.place.whatsapp === this.dialCode) {
            this.place.whatsapp = undefined;
        }
        this.storageInstance.placeToEdit = this.place;
        this.route.navigate(['/app/business-details/select-icon']);
        this.saving = false;
    }

}
