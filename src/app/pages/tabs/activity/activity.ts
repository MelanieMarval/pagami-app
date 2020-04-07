import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../../core/api/places/places.service';
import { ToastProvider } from '../../../providers/toast.provider';
import { Place } from '../../../core/api/places/place';
import { StorageService } from '../../../core/storage/storage.service';
import { ResolveEnd, Router } from '@angular/router';
import { PLACES } from '../../../utils/Const';
import { IntentProvider } from '../../../providers/intent.provider';
import { ApiResponse } from '../../../core/api/api.response';
import { isNumber } from 'util';
import { PlaceUtils } from '../../../utils/place.utils';

@Component({
    selector: 'app-activity',
    templateUrl: 'activity.html',
    styleUrls: ['../wallet/wallet.scss']
})
export class ActivityPage implements OnInit {

    loading = true;
    error = false;
    registers: Place[];
    STATUS = PLACES.STATUS;
    indexOfPlaceToEdit: number = undefined;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;
    placeMessageStatus = PlaceUtils.getMessageStatus;

    constructor(private placesService: PlacesService,
                private storageService: StorageService,
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
                if (success.passed) {
                    this.registers = await success.response.filter(place => place.status);
                    this.loading = false;
                    this.error = false;
                } else {
                    this.loading = false;
                    this.error = true;
                }
            });
    }

    verifyItemUpdated() {
        if (this.storageInstance.placeEdited && isNumber(this.indexOfPlaceToEdit)) {
            this.registers[this.indexOfPlaceToEdit] = this.storageInstance.placeEdited;
            this.storageInstance.placeEdited = undefined;
            this.indexOfPlaceToEdit = undefined;
        }
    }

    showDetails(place: Place) {
        if (place.status === PLACES.STATUS.INCOMPLETE || place.status === PLACES.STATUS.WAITING) {
            this.indexOfPlaceToEdit = this.registers.indexOf(place);
            this.storageInstance.placeToEdit = Object.assign({}, place);
            this.router.navigate(['/app/business-details']).then();
        }
    }
}
