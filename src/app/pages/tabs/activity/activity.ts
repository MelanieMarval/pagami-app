import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { PlacesService } from '../../../core/api/places/places.service';
import { ApiResponse } from '../../../core/api/api.response';
import { Place } from '../../../core/api/places/place';
// Providers
import { ToastProvider } from '../../../providers/toast.provider';
import { StorageProvider } from '../../../providers/storage.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
// Utils
import { isNumber } from 'util';
import { PLACES } from '../../../utils/Const';
import { PlaceUtils } from '../../../utils/place.utils';
import { User } from '../../../core/api/users/user';

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
    user: User;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;
    placeMessageStatus = PlaceUtils.getMessageStatus;
    placeSortData = PlaceUtils.getSortData;

    constructor(private placesService: PlacesService,
                private storageService: StorageProvider,
                private router: Router,
                private toast: ToastProvider,
                private storageInstance: UserIntentProvider) {
    }

    async ngOnInit() {
        this.router.events.subscribe(next => {
            if (next instanceof ResolveEnd) {
                this.verifyItemUpdated();
            }
        });
        this.getRegisters();
        this.user = await this.storageService.getPagamiUser();
    }

    getRegisters() {
        this.loading = true;
        this.placesService.myRegisters()
            .then(async (success: ApiResponse) => {
                if (success.passed) {
                    this.registers = await success.response.filter(place => place.status);
                    this.loading = false;
                    this.error = false;
                } else {
                    this.loading = false;
                    this.error = true;
                    this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando la informacion');
                }
            }).catch(error => {
            this.loading = false;
            this.error = true;
            this.toast.messageErrorWithoutTabs('Hemos tenido problemas cargando la informacion');
        });
    }

    verifyItemUpdated() {
        if (this.storageInstance.placeEdited) {
            if (this.registers.filter(place => place.id === this.storageInstance.placeEdited.id).length === 0) {
                this.getRegisters();
            } else {
                if (isNumber(this.indexOfPlaceToEdit)) {
                    this.registers[this.indexOfPlaceToEdit] = this.storageInstance.placeEdited;
                    this.indexOfPlaceToEdit = undefined;
                }
            }
            this.storageInstance.placeEdited = undefined;
        }
    }

    showDetails(place: Place) {
        if (place.status === this.STATUS.INCOMPLETE || place.status === this.STATUS.WAITING) {
            this.indexOfPlaceToEdit = this.registers.indexOf(place);
            this.storageInstance.placeToEdit = Object.assign({}, place);
            this.router.navigate(['/app/business-details']);
            return;
        }
        if (place.status === this.STATUS.ACCEPTED || place.status === this.STATUS.VERIFIED) {
            if (place.claim && place.claim.userId === this.user.id) {
                this.router.navigate(['/app/tabs/my-business']);
            } else {
                this.storageInstance.placeToShow = place;
                this.router.navigate(['/app/shop']);
            }
        }
    }

}
