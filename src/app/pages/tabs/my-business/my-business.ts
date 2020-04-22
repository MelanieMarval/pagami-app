import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { InputFilePage } from '../../parent/InputFilePage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { Place } from '../../../core/api/places/place';
import { ValidationUtils } from '../../../utils/validation.utils';
import { ToastProvider } from '../../../providers/toast.provider';
import { PlacesService } from '../../../core/api/places/places.service';
import { ClaimService } from '../../../core/api/claim/claim.service';
import { IntentProvider } from '../../../providers/intent.provider';
import { Router } from '@angular/router';

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

    constructor(
        private claim: ClaimService,
        private toast: ToastProvider,
        private placesService: PlacesService,
        private intentProvider: IntentProvider,
        private router: Router,
        protected geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }

    ngOnInit() {
        this.claim.getMyBusiness()
            .then(success => {
                console.log(success);
                if (success.passed) {
                    this.loading = false;
                    if (success.response.status === 'WAITING') {
                        this.isClaim = true;
                    } else {
                        this.isRegister = true;
                        this.place = success.response;
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
    ngAfterViewChecked(): void {
        if (this.intentProvider.placeToClaim) {
            this.intentProvider.placeToClaim = undefined;
            this.isClaim = true;
        }
    }

    editBusiness() {
        this.isEditing = !this.isEditing;
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
        console.log(this.place);
        this.updating = true;
        this.placesService.update(this.place)
            .then(async success => {
                if (success.passed === true) {
                    console.log('-> success.response', success.response);
                    this.isEditing = false;
                    this.updating = false;
                    await this.toast.messageSuccessWithoutTabs('Su empresa ha sido actulizada exitosamente!');
                } else {
                    this.updating = false;
                    await this.toast.messageErrorWithoutTabs('No se han podido actualizar su informacion. Intente de nuevo!');
                }
            });
    }

    viewShop() {
        this.intentProvider.placeToShow = this.place;
        this.router.navigate(['/app/shop']);
    }
}
