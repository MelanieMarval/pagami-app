import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { MapPage } from '../../parent/MapPage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { PagamiGeo } from '../../../core/geolocation/pagami.geo';
import { PlacesService } from '../../../core/api/places/places.service';
import { Place } from '../../../core/api/places/place';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/storage/storage.service';
import { PagamiToast } from '../../../toast/pagami.toast';

@Component({
    selector: 'app-register-business',
    templateUrl: 'register-business.html',
    styleUrls: ['register-business.scss']
})
export class RegisterBusinessPage extends MapPage implements AfterViewInit {

    @ViewChild('mapCanvas', {static: true}) mapElement: ElementRef;

    beforeSaveLocation = true;
    saving = false;
    placeToSave;

    constructor(
        private storageService: StorageService,
        private router: Router,
        private toast: PagamiToast,
        @Inject(DOCUMENT) doc: Document,
        protected geolocationService: GeolocationService,
        private placesService: PlacesService) {
        super(doc, geolocationService);
    }

    async saveLocation() {
        this.saving = true;
        const coors = await this.geolocationService.getCurrentLocation();
        const place: Place = {
            latitude: coors.latitude,
            longitude: coors.longitude,
            accuracy: coors.accuracy,
        };
        this.placesService.save(place).then(
            async (success: any) => {
                await this.toast.messageSuccessAboveButton('Ubicación guardada exitosamente')
                this.placeToSave = success.response;
                this.beforeSaveLocation = false;
                this.saving = false;
            }
            , reason => {
                this.saving = false;
            });
    }

    onCurrentPositionChanged(coors: PagamiGeo) {
        this.setupMarkerCurrentPosition(coors);
        this.changeMapCenter(coors);
    }

    async navigateToBusinessDetails() {
        await this.storageService.setPlaceUnregistered(this.placeToSave);
        await this.router.navigate(['/app/business-details', this.placeToSave.id]);
        this.beforeSaveLocation = true;
        this.placeToSave = undefined;
        this.saving = false;
    }

    async ngAfterViewInit() {
        /**
         * load map and wait
         */
        await this.loadMap(true);
        /**
         * subscribing to current location changes
         */
        this.geolocationService.locationChanged.subscribe(
            (coors: PagamiGeo) => {
                this.onCurrentPositionChanged(coors);
            });
        /**
         * Enable watch location if status is disabled
         */
        this.geolocationService.enableLocation();
        /**
         * set center and marker position
         */
        this.onCurrentPositionChanged(await this.geolocationService.getCurrentLocation());
    }
}
