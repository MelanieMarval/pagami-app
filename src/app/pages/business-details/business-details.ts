import { Component, OnInit } from '@angular/core';
import { InputFilePage } from '../parent/InputFilePage';
import { StorageService } from '../../core/storage/storage.service';
import { Place } from '../../core/api/places/place';
import { Router } from '@angular/router';
import { PLACES } from '../../utils/Const';
import { PagamiToast } from '../../toast/pagami.toast';
import { FireStorage } from '../../core/fire-storage/fire.storage';
import { PlacesService } from '../../core/api/places/places.service';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { ValidationUtils } from '../../utils/validation.utils';
import { StorageInstance } from '../../providers/storage.instance';

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

    constructor(private storageService: StorageService,
                private placesService: PlacesService,
                private route: Router,
                private toast: PagamiToast,
                private fireStorage: FireStorage,
                private storageInstance: StorageInstance,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    ngOnInit() {
        setTimeout(async () => {
            this.setupData();
        }, 500);
    }

    setupData() {
        this.place = this.storageInstance.placeToEdit;
        this.previewUrl = this.place.photoUrl ? this.place.photoUrl : undefined;
        if (this.place.type === PLACES.TYPE.STORE) {
            this.isStore = true;
        }
        if (this.place.type === PLACES.TYPE.SERVICE) {
            this.isService = true;
        }
    }

    setPlace(place) {
        this.place.location = place;
        this.places = [];
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
        if (!business.location || !business.name || !business.website || !this.place.type || !business.phone) {
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
