import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputFilePage } from '../parent/InputFilePage';
import { Place } from '../../core/api/places/place';
import { PLACES } from '../../utils/Const';
import { FireStorage } from '../../core/fire-storage/fire.storage';
import { ValidationUtils } from '../../utils/validation.utils';
// Services
import { PlacesService } from '../../core/api/places/places.service';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
// Providers
import { StorageProvider } from '../../providers/storage.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { IntentProvider } from '../../providers/intent.provider';
import { AlertController } from '@ionic/angular';

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

    constructor(private storageService: StorageProvider,
                private placesService: PlacesService,
                private route: Router,
                private toast: ToastProvider,
                private fireStorage: FireStorage,
                private storageInstance: IntentProvider,
                protected geolocationService: GeolocationService,
                private alertController: AlertController) {
        super(geolocationService);
    }

    ngOnInit() {
        this.setupData(this.storageInstance.placeToEdit);
    }

    setupData(place: Place) {
        this.place = place;
        this.getAddress(place.latitude, place.longitude);
        this.previewUrl = this.place.photoUrl ? this.place.photoUrl : undefined;
        if (this.place.type === PLACES.TYPE.STORE) {
            this.isStore = true;
        }
        if (this.place.type === PLACES.TYPE.SERVICE) {
            this.isService = true;
        }
    }

    getAddress(lat: number, lng: number) {
        this.placesService.getPlaceByGeocode(lat, lng)
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
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            this.storageInstance.placeToEdit = undefined;
                            this.route.navigate(['/app/tabs/wallet/activity']);
                        }
                    }, {
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
        if (!business.location.address || !business.name || !business.website || !this.place.type || !business.phone) {
            return this.toast.messageErrorWithoutTabs('Toda su informacion debe estar rellenada');
        }
        if (!ValidationUtils.validateEmpty(this.place, ['photoURL', 'icon'])) {
            return this.toast.messageErrorWithoutTabs('Toda su informacion debe estar rellenada');
        }
        if (!ValidationUtils.validatePhone(business.phone)) {
            this.toast.messageErrorWithoutTabs('Su número de teléfono debe contener minimo 8 digitos y menos de 15');
            return;
        }
        if (!this.place.samePhone && business.whatsapp.trim().length > 0 && !ValidationUtils.validatePhone(business.whatsapp)) {
            this.toast.messageErrorWithoutTabs('Su número de Whatsapp debe contener minimo 8 digitos y menos de 15');
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
            this.navigateToSelectIcon();
        } else {
            this.toast.messageErrorWithoutTabs('No se ha podido guardar su imagen. Intente de nuevo!');
            this.saving = false;
        }
    }

    async navigateToSelectIcon() {
        this.saving = true;
        this.storageInstance.placeToEdit = this.place;
        await this.route.navigate(['/app/business-details/select-icon']);
        this.saving = false;
    }

}
