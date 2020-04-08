import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    selector: 'app-admin-records',
    templateUrl: 'records.html',
    styleUrls: ['records.scss']
})
export class RecordsPage implements OnInit, AfterViewChecked {

    loading = true;
    error = false;
    showNotification = true;
    records: Place[];
    STATUS = PLACES.STATUS;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;

    constructor(private placesService: PlacesService,
                private storageService: StorageProvider,
                private router: Router,
                private toast: ToastProvider,
                private activatedRoute: ActivatedRoute,
                private intentProvider: IntentProvider) {
    }

    ngOnInit() {
        this.placesService.getAllWaiting().then((success: ApiResponse) => {
            this.loading = false;
            if (success.passed) {
                this.records = success.response;
                this.error = false;
            } else {
                this.error = true;
            }
        });
    }

    ngAfterViewChecked(): void {
        if (this.intentProvider.returnPlaceToAccept) {
            const index = this.records.indexOf(this.records.filter(record => record.id === this.intentProvider.returnPlaceToAccept.id)[0]);
            this.records.splice(index, 1);
            this.intentProvider.returnPlaceToAccept = undefined;
        }
    }

    showRecord(place: Place) {
        this.intentProvider.placeToAccept = place;
        this.router.navigate(['admin/tabs/records/details']);
    }

}
