import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { GeolocationService } from '../../../../core/geolocation/geolocation.service';
import { InputFilePage } from '../../../parent/InputFilePage';
import { FireStorage } from '../../../../core/fire-storage/fire.storage';
import { PlacesService } from '../../../../core/api/places/places.service';
import { StorageProvider } from '../../../../providers/storage.provider';
import { Place } from '../../../../core/api/places/place';
import { BusinessHours } from '../../../../core/api/places/business-hours';
import { WeedDayHours } from '../../../../core/api/places/weed-day-hours';

@Component({
    selector: 'page-flyer',
    templateUrl: 'business-hours.html',
    styleUrls: ['./business-hours.scss'],
})

export class BusinessHoursPage extends InputFilePage implements OnInit {

    private place: Place;
    loading: any;
    updating: boolean;
    hours: WeedDayHours = { hoursOne: {}, hoursTwo: {} };
    businessHours: BusinessHours = {
        type: 0,
        monday: this.hours,
        tuesday: this.hours,
        wednesday: this.hours,
        thursday: this.hours,
        friday: this.hours,
        saturday: this.hours,
        sunday: this.hours
    };
    haveBreakTime = false;

    constructor(private toast: ToastProvider,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private fireStorage: FireStorage,
                private storage: StorageProvider,
                private placesService: PlacesService,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    async ngOnInit() {
        this.place = await this.storage.getBusinessVerifiedByUser();
    }

    async confirmDelete() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Esta seguro?',
            message: 'Una vez eliminado su volante digital no podra recuperarlo',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Si, Eliminar',
                    handler: () => {
                        this.deleteFlyer();
                    }
                }
            ]
        });

        await alert.present();
    }

    deleteFlyer() {
        console.log('Eliminar flyer');
        this.loading = true;
        this.placesService.deleteFlyer(this.place.id)
            .then(success => {
                this.loading = false;
                console.log('-> success', success);
            });
    }

    setBreakTime(event: any) {
        console.log('-> this.businessHours.type', typeof this.businessHours.type);
        console.log('-> event', event);
        switch (Number(this.businessHours.type)) {
            case 1:
                console.log('-> show');
                this.haveBreakTime = event;
                break;
            case 2:
                break;
        }
    }
}
