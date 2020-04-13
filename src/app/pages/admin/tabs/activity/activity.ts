import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { PlacesService } from '../../../../core/api/places/places.service';
import { ApiResponse } from '../../../../core/api/api.response';
import { Place } from '../../../../core/api/places/place';

// Providers
import { ToastProvider } from '../../../../providers/toast.provider';
import { StorageProvider } from '../../../../providers/storage.provider';
import { IntentProvider } from '../../../../providers/intent.provider';
// Utils
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';

@Component({
    selector: 'app-admin-activity',
    templateUrl: 'activity.html',
    styleUrls: ['activity.scss']
})
export class ActivityPage implements OnInit {

    loading = true;
    error = false;
    empty = false;
    registers: Place[];
    STATUS = PLACES.STATUS;
    indexOfPlaceToEdit: number = undefined;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;
    placeMessageStatus = PlaceUtils.getMessageStatus;

    constructor(private placesService: PlacesService,
                private storageService: StorageProvider,
                private router: Router,
                private toast: ToastProvider,
                private storageInstance: IntentProvider) {
    }

    ngOnInit() {
        this.router.events.subscribe(next => {
            if (next instanceof ResolveEnd) {
                this.verifyItemUpdated();
            }
        });
        this.placesService.myRegisters().then(async (success: ApiResponse) => {
                this.loading = false;
                if (success.passed) {
                    this.registers = success.response;
                    this.error = false;
                    this.empty = this.registers.length === 0;
                } else {
                    this.error = true;
                    this.toast.messageErrorWithoutTabs('La informacion no se ha podido cargar. Intente de nuevo!', 5000);
                }
            });
    }

    verifyItemUpdated() {
        if (this.storageInstance.placeEdited && Number(this.indexOfPlaceToEdit)) {
            this.registers[this.indexOfPlaceToEdit] = this.storageInstance.placeEdited;
            this.storageInstance.placeEdited = undefined;
            this.indexOfPlaceToEdit = undefined;
        }
    }

    showDetails(place: Place) {
        if (place.status === this.STATUS.INCOMPLETE || place.status === this.STATUS.WAITING) {
            this.indexOfPlaceToEdit = this.registers.indexOf(place);
            this.storageInstance.placeToEdit = Object.assign({}, place);
            this.router.navigate(['/app/business-details']).then();
            return;
        }
        if (place.status === this.STATUS.ACCEPTED || place.status === this.STATUS.VERIFIED) {
            this.storageInstance.placeToShow = place;
            this.router.navigate(['/app/shop']).then();
        }
    }

    goToProfile() {
        this.router.navigate(['/admin/profile']);
    }
}
