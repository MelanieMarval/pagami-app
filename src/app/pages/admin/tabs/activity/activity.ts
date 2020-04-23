import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { PlacesService } from '../../../../core/api/places/places.service';

// Providers
import { ToastProvider } from '../../../../providers/toast.provider';
import { StorageProvider } from '../../../../providers/storage.provider';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';
// Utils
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';
import { Place } from '../../../../core/api/places/place';
import { ApiResponse } from '../../../../core/api/api.response';
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';

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
                private router: Router,
                private toast: ToastProvider,
                private intentProvider: AdminIntentProvider) {
    }

    ngOnInit() {
        this.router.events.subscribe(next => {
            if (next instanceof ResolveEnd) {
                this.verifyItemUpdated();
            }
        });
        this.loading = false;
        this.error = false;
        this.empty = true;
        // this.placesService.myRegisters().then(async (success: ApiResponse) => {
        //         this.loading = false;
        //         if (success.passed) {
        //             this.registers = success.response;
        //             this.error = false;
        //             this.empty = this.registers.length !== 0;
        //         } else {
        //             this.error = true;
        //             this.toast.messageErrorWithoutTabs('La informacion no se ha podido cargar. Intente de nuevo!', 5000);
        //         }
        //     });
    }

    verifyItemUpdated() {
        if (this.intentProvider.placeEdited && Number(this.indexOfPlaceToEdit)) {
            this.registers[this.indexOfPlaceToEdit] = this.intentProvider.placeEdited;
            this.intentProvider.placeEdited = undefined;
            this.indexOfPlaceToEdit = undefined;
        }
    }

    showDetails(place: Place) {
        if (place.status === this.STATUS.INCOMPLETE || place.status === this.STATUS.WAITING) {
            this.indexOfPlaceToEdit = this.registers.indexOf(place);
            this.intentProvider.placeToEdit = Object.assign({}, place);
            this.router.navigate(['/app/business-details']).then();
            return;
        }
        if (place.status === this.STATUS.ACCEPTED || place.status === this.STATUS.VERIFIED) {
            this.intentProvider.placeToView = place;
            this.router.navigate(['/app/shop']).then();
        }
    }

    goToProfile() {
        this.router.navigate(['/admin/profile']);
    }
}
