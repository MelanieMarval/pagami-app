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
import { FireStorage } from '../../../core/fire-storage/fire.storage';

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
    isSearching = false;

    constructor(
        private router: Router,
        private toast: ToastProvider,
        private alert: AlertProvider,
        private intentProvider: UserIntentProvider,
        private claimService: ClaimService,
        private placesService: PlacesService,
        private fireStorage: FireStorage,
        private storageService: StorageProvider,
        protected geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }

    ngOnInit() {
        this.loadInfo();
    }

    async loadInfo() {
        this.intentProvider.placeToChangeLocation = undefined;
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
        if (this.intentProvider.placeToChangeLocation || (!this.intentProvider.placeToClaim && this.isSearching)) {
            this.isSearching = false;
            this.ngOnInit();
        }
    }

    getMyBusiness() {
        this.claimService.getMyBusiness()
            .then(success => {
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

    validateBusiness() {
        if (!ValidationUtils.validateEmpty(this.place, ['website', 'whatsapp'])) {
            this.toast.messageErrorAboveButton('Todos los campos deben estar llenos para poder guardar');
            return;
        }
        if (!ValidationUtils.validatePhone(this.place.phone)) {
            this.toast.messageErrorAboveButton('Su número de teléfono debe contener entre 8 y 15 digitos');
            return;
        }
        if (this.previewUrl !== this.place.photoUrl) {
            this.saveImage();
        } else {
            this.saveBusiness();
        }
    }

    async saveImage() {
        this.updating = true;
        const success = await this.fireStorage.saveBusinessImage(this.fileData);
        if (success) {
            this.place.photoUrl = success;
            this.previewUrl = success;
            this.saveBusiness();
        } else {
            this.toast.messageErrorWithoutTabs('No se ha podido guardar su imagen. Intente de nuevo!');
            this.updating = false;
        }
    }

    saveBusiness() {
        this.updating = true;
        this.placesService.update(this.place)
            .then( success => {
                if (success.passed === true) {
                    this.storageService.setBusinessVerifiedByUser(success.response);
                    this.isEditing = false;
                    this.updating = false;
                    this.toast.messageSuccessWithoutTabs('Su empresa ha sido actualizada exitosamente!');
                } else {
                    this.updating = false;
                    this.toast.messageErrorWithoutTabs('Puede que este experimentando problemas de conexión. Intente de nuevo!');
                }
            }).catch(error => {
                this.updating = false;
                this.toast.messageErrorWithoutTabs('Estamos teniendo problemas al procesar su solicitud. Intente mas tarde');
            });
    }

    searchBusiness() {
        this.toast.messageInfoForMap('Busca tu empresa en el mapa y seleccionala para continuar');
        this.isSearching = true;
    }

}
