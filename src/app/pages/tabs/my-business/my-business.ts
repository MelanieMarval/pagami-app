import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Providers
import { ToastProvider } from '../../../providers/toast.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { AlertProvider } from '../../../providers/alert.provider';
import { StorageProvider } from '../../../providers/storage.provider';
// Services
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { PlacesService } from '../../../core/api/places/places.service';
import { ClaimService } from '../../../core/api/claim/claim.service';
import { Claim } from '../../../core/api/claim/claim';
import { Place } from '../../../core/api/places/place';

import { InputFilePage } from '../../parent/InputFilePage';
import { ValidationUtils } from '../../../utils/validation.utils';

@Component({
    selector: 'app-my-business',
    templateUrl: 'my-business.html',
    styleUrls: ['my-business.scss']
})
export class MyBusinessPage extends InputFilePage implements OnInit, AfterViewChecked {
    isRegister = false;
    availableToClaim = false;
    isClaim = false;
    isEditing = false;
    updating = false;
    loading = true;
    place: Place = {latitude: 0, longitude: 0};
    claim: Claim;

    constructor(
        private router: Router,
        private toast: ToastProvider,
        private alert: AlertProvider,
        private intentProvider: UserIntentProvider,
        private claimService: ClaimService,
        private placesService: PlacesService,
        private storageService: StorageProvider,
        protected geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }

    async ngOnInit() {
        const myBusiness = await this.storageService.getBusinessVerifiedByUser();
        if (myBusiness) {
            this.loading = false;
            this.isRegister = true;
            this.place = myBusiness;
            this.previewUrl = this.place.photoUrl;
        } else {
            this.getMyBusiness();
        }

    }

    async ngAfterViewChecked() {
        if (this.intentProvider.placeToClaim) {
            this.intentProvider.placeToClaim = await undefined;
            this.isClaim = true;
        }
    }

    getMyBusiness() {
        this.claimService.getMyBusiness()
            .then(success => {
                console.log(success);
                if (success.passed) {
                    this.loading = false;
                    if (success.response.status === 'WAITING') {
                        this.isClaim = true;
                        this.claim = success.response;
                    } else {
                        this.isRegister = true;
                        this.place = success.response.place;
                        this.storageService.setBusinessVerifiedByUser(success.response.place);
                        this.previewUrl = this.place.photoUrl;
                    }
                } else {
                    this.isClaim = false;
                    if (success.code === 71) {
                        this.availableToClaim = true;
                    }
                    this.loading = false;
                }
            });
    }

    async saveBusiness() {
        if (!ValidationUtils.validateEmpty(this.place, ['registeredBy'])) {
            await this.toast.messageErrorAboveButton('Todos los campos deben estar llenos para poder guardar');
            return;
        }
        if (!ValidationUtils.validatePhone(this.place.phone)) {
            await this.toast.messageErrorAboveButton('Su número de teléfono debe contener entre 8 y 15 digitos');
            return;
        }
        this.updating = true;
        this.placesService.update(this.place)
            .then(async success => {
                if (success.passed === true) {
                    this.storageService.setBusinessVerifiedByUser(success.response);
                    this.isEditing = false;
                    this.updating = false;
                    await this.toast.messageSuccessWithoutTabs('Su empresa ha sido actualizada exitosamente!');
                } else {
                    this.updating = false;
                    await this.toast.messageErrorWithoutTabs('No se ha podido actualizar su informacion. Intente de nuevo!');
                }
            });
    }

}
