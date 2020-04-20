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
    empty = false;
    showNotification = {
        verified: false,
        accepted: false
    };
    tabView = 'beAccepted';
    recordsToBeAccepted: Place[];
    recordsToBeVerified: Place[];
    STATUS = PLACES.STATUS;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;

    constructor(private placesService: PlacesService,
                private storageService: StorageProvider,
                private router: Router,
                private toast: ToastProvider,
                private activatedRoute: ActivatedRoute,
                private intentProvider: IntentProvider) {
    }

    async ngOnInit() {
        this.intentProvider.showNotification = false;
        await this.placesService.getAllClaimWaiting()
            .then(success => {
                if (success.passed) {
                    this.recordsToBeVerified = success.response;
                    this.showNotification.verified = this.recordsToBeVerified.length !== 0;
                    this.empty = this.recordsToBeVerified.length === 0;
                } else {
                    this.error = true;
                    this.loading = false;
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 3000);
                }
            });
        await this.placesService.getAllWaiting()
            .then((success: ApiResponse) => {
                this.loading = false;
                if (success.passed) {
                    this.recordsToBeAccepted = success.response;
                    this.showNotification.accepted = this.recordsToBeAccepted.length !== 0;
                    this.empty = this.recordsToBeAccepted.length === 0;
                    this.error = false;
                } else {
                    this.error = true;
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 3000);
                }
            });
    }

    ngAfterViewChecked(): void {
        // Cuando vuelve luego de aceptar un place lo elimina de la lista
        if (this.intentProvider.returnPlaceToAccept) {
            const index = this.recordsToBeAccepted.indexOf(this.recordsToBeAccepted
                .filter(record => record.id === this.intentProvider.returnPlaceToAccept.id)[0]);
            this.recordsToBeAccepted.splice(index, 1);
            this.intentProvider.returnPlaceToAccept = undefined;
        }
    }

    showRecord(place: Place) {
        this.intentProvider.placeToAccept = place;
        this.router.navigate(['admin/tabs/records/details']);
    }

    changeTab($event: CustomEvent) {
        this.tabView = $event.detail.value;
    }
}
