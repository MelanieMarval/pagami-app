import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {DOCUMENT} from '@angular/common';
import {MapPage} from '../../parent/MapPage';

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
        geolocation: Geolocation,
        @Inject(DOCUMENT) doc: Document) {
        super(geolocation, doc);
    }

    async ngAfterViewInit() {
      this.loadMap(true);
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

}
