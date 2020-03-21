import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { MapPage } from '../../parent/MapPage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';

@Component({
    selector: 'app-register-business',
    templateUrl: 'register-business.html',
    styleUrls: ['register-business.scss']
})
export class RegisterBusinessPage extends MapPage implements AfterViewInit {

    @ViewChild('mapCanvas', {static: true}) mapElement: ElementRef;

    beforeSaveLocation = true;

    constructor(
        public toastController: ToastController,
        @Inject(DOCUMENT) doc: Document,
        protected geolocationService: GeolocationService) {
        super(doc, geolocationService);
    }

    async saveLocation() {

        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2000,
            cssClass: 'toast-bottom-custom',
            message: 'Ubicación guardada exitosamente',
            position: 'bottom',
        });

        await toast.present();
        this.beforeSaveLocation = false;
    }

    onCurrentPositionChanged(position: any) {
        this.setupMarkerCurrentPosition(position);
        this.changeMapCenter(position);
    }

    async ngAfterViewInit() {
        /**
         * Enable watch location if status is disabled
         */
        this.geolocationService.enableLocation();
        /**
         * load map and wait
         */
        await this.loadMap(true);
        /**
         * set center and marker position
         */
        this.onCurrentPositionChanged(this.geolocationService.getCurrentLocation());
        /**
         * subscribing to current location changes
         */
        this.geolocationService.locationChanged.subscribe(
            (coors: Coordinates) => {
                console.log(coors);
                this.onCurrentPositionChanged(coors);
            });
    }
}
