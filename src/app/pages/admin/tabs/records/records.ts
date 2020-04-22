import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../../../core/api/places/places.service';
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

    loading = {
        verified: true,
        accepted: false
    };
    error = false;
    empty = {
        verified: false,
        accepted: false
    };
    showNotification = {
        verified: false,
        accepted: false
    };
    tabView = 'beAccepted';
    recordsToBeAccepted: Place[];
    totalToBeAccepted: number;
    recordsToBeVerified: Place[];
    totalToBeVerified: number;
    STATUS = PLACES.STATUS;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;

    constructor(private placesService: PlacesService,
                private storageService: StorageProvider,
                private router: Router,
                private toast: ToastProvider,
                private activatedRoute: ActivatedRoute,
                private intentProvider: IntentProvider,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.intentProvider.showNotification = false;
        this.getRecordsToBeAccepted();
    }

    ngAfterViewChecked(): void {
        // Cuando vuelve luego de aceptar o verificar un place lo elimina de la lista
        if (this.intentProvider.returnPlaceToAccept) {
            const index = this.recordsToBeAccepted.indexOf(this.recordsToBeAccepted
                .filter(record => record.id === this.intentProvider.returnPlaceToAccept.id)[0]);
            this.recordsToBeAccepted.splice(index, 1);
            this.totalToBeAccepted = this.totalToBeAccepted - 1;
            this.showNotification.accepted = this.totalToBeAccepted !== 0;
            this.empty.accepted = this.totalToBeAccepted === 0;
            this.intentProvider.returnPlaceToAccept = undefined;
            this.cdRef.detectChanges();
        }
        if (this.intentProvider.returnPlaceToVerified) {
            const index = this.recordsToBeVerified.indexOf(this.recordsToBeVerified
                .filter(record => record.id === this.intentProvider.returnPlaceToVerified.id)[0]);
            this.recordsToBeVerified.splice(index, 1);
            this.totalToBeVerified = this.totalToBeVerified - 1;
            this.showNotification.verified = this.totalToBeVerified !== 0;
            this.empty.verified = this.totalToBeVerified === 0;
            this.intentProvider.returnPlaceToVerified = undefined;
            this.cdRef.detectChanges();
        }
    }

    getRecordsToBeAccepted() {
        this.loading.accepted = true;
        console.log('hacer getRecordsToBeAccepted');
        this.placesService.getAllWaiting()
            .then(success => {
                console.log('hacer consulta');
                this.loading.accepted = false;
                if (success.passed) {
                    this.recordsToBeAccepted = success.response;
                    this.showNotification.accepted = this.recordsToBeAccepted.length !== 0;
                    this.totalToBeAccepted = this.recordsToBeAccepted.length;
                    this.empty.accepted = this.recordsToBeAccepted.length === 0;
                    this.error = false;
                    this.getRecordsToBeVerified();
                } else {
                    this.error = true;
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 3000);
                }
            });
    }

    getRecordsToBeVerified() {
        console.log('hacer getRecordsToBeVerified');
        this.loading.verified = true;
        this.placesService.getAllClaimWaiting()
            .then(success => {
                this.loading.verified = false;
                if (success.passed) {
                    this.recordsToBeVerified = success.response;
                    this.showNotification.verified = this.recordsToBeVerified.length !== 0;
                    this.totalToBeVerified = this.recordsToBeVerified.length;
                    this.empty.verified = this.recordsToBeVerified.length === 0;
                    this.error = false;
                } else {
                    this.error = true;
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 3000);
                }
            });
    }

    showRecord(place: Place, type: string) {
        if (type === 'verified') {
            this.intentProvider.placeToAccept = undefined;
            this.intentProvider.placeToVerified = place;
        } else {
            this.intentProvider.placeToVerified = undefined;
            this.intentProvider.placeToAccept = place;
        }
        this.router.navigate(['admin/tabs/records/details']);
    }

    changeTab($event: CustomEvent) {
        this.tabView = $event.detail.value;
    }
}
