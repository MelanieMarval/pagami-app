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
import { UserIntentProvider } from '../../../../providers/user-intent.provider';
import { Router } from '@angular/router';

@Component({
    selector: 'page-flyer',
    templateUrl: 'business-hours.html',
    styleUrls: ['./business-hours.scss'],
})

export class BusinessHoursPage extends InputFilePage implements OnInit {

    private place: Place;
    haveHours: boolean;
    loading: any;
    updating: boolean;
    businessHours: BusinessHours = {
        type: 0,
        monday: {active: true, hoursOne: {}, hoursTwo: {}},
        tuesday: {active: true, hoursOne: {}, hoursTwo: {}},
        wednesday: {active: true, hoursOne: {}, hoursTwo: {}},
        thursday: {active: true, hoursOne: {}, hoursTwo: {}},
        friday: {active: true, hoursOne: {}, hoursTwo: {}},
        saturday: {active: true, hoursOne: {}, hoursTwo: {}},
        sunday: {active: true, hoursOne: {}, hoursTwo: {}}
    };

    constructor(private toast: ToastProvider,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private fireStorage: FireStorage,
                private storage: StorageProvider,
                private placesService: PlacesService,
                private intentProvider: UserIntentProvider,
                private router: Router,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    async ngOnInit() {
        this.place = await this.storage.getBusinessVerifiedByUser();
        if (!this.place.hours) {
            this.haveHours = false;
        } else {
            this.haveHours = true;
            this.businessHours = this.place.hours;
            console.log('-> this.businessHours', this.businessHours);
        }
    }

    validateHours() {
        // tslint:disable-next-line:prefer-const
        let {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.businessHours;
        if (!this.businessHours.type) {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar su tipo de horario y rellenarlo');
        }
        if (this.businessHours.type === 1) {
            if (!this.validateEmpty(this.businessHours.monday)) {
                return this.toastEmpty();
            }
            console.log('-> monday.hoursOne', this.businessHours.monday.hoursOne);
            if (!this.validateDay(this.businessHours.monday.hoursOne)) {
                return this.toastError('');
            }
            if (!this.businessHours.monday.breakTime) {
                this.businessHours.monday.hoursTwo = {};
            } else {
                if (!this.validateDay(monday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno');
                }
                this.businessHours.monday.hoursTwo = this.parseDay(this.businessHours.monday.hoursTwo);
            }
            this.businessHours.monday.hoursOne = this.parseDay(this.businessHours.monday.hoursOne);
            this.businessHours.tuesday = this.businessHours.monday;
            this.businessHours.wednesday = this.businessHours.monday;
            this.businessHours.thursday = this.businessHours.monday;
            this.businessHours.friday = this.businessHours.monday;
            this.businessHours.saturday = this.businessHours.monday;
            this.businessHours.sunday = this.businessHours.monday;
        }
        if (this.businessHours.type === 2) {
            if (!this.validateEmpty(monday)) {
                return this.toastEmpty('de lunes a viernes');
            }
            if (!this.validateEmpty(saturday)) {
                return this.toastEmpty('para el dia sabado o marcarlo como cerrado');
            }
            if (!this.validateEmpty(sunday)) {
                return this.toastEmpty('para el dia domingo o marcarlo como cerrado');
            }
            this.businessHours.tuesday = monday;
            this.businessHours.wednesday = monday;
            this.businessHours.thursday = monday;
            this.businessHours.friday = monday;
        }
        if (this.businessHours.type === 3) {
            console.log('-> a llorar');
        }
        this.saveBusinessHours();
    }

    private parseDay(hours: any) {
        let to: any; let from: any;
        if (this.haveHours) {
            to = hours.to + ':00';
            from = hours.from + ':00';
        } else {
            to = new Date(hours.to).getHours() + ':' + new Date(hours.to).getMinutes() + ':00';
            from = new Date(hours.from).getHours() + ':' + new Date(hours.from).getMinutes() + ':00';
        }
        return {to, from};
    }

    private validateEmpty(day: WeedDayHours): boolean {

        if (day.active) {
            if (!day.hoursOne) {
                return false;
            } else {
                if (!day.hoursOne.to || !day.hoursOne.from) {
                    return false;
                }
                if (day.breakTime) {
                    if (!day.hoursTwo) {
                        return false;
                    } else {
                        if (!day.hoursTwo.to || !day.hoursTwo.from) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    private validateDay(hours: any): boolean {
        let hourTo: any; let hourFrom: any;
        if (this.haveHours) {
            hourTo = hours.to.split(':')[0];
            hourFrom = hours.from.split(':')[0];
        } else {
            hourTo = new Date(hours.to).getHours();
            hourFrom = new Date(hours.from).getHours();
        }
        return Number(hourFrom) < Number(hourTo);
    }


    async confirmDelete() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Esta seguro?',
            message: 'Una vez eliminado su horario no podrá ser recuperado y deberá crear uno nuevo',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Si, Eliminar',
                    handler: () => {
                        this.deleteHours();
                    }
                }
            ]
        });

        await alert.present();
    }

    private deleteHours() {
        console.log('Eliminar horario');
        this.loading = true;
        this.placesService.deleteHours(this.place.id)
            .then(success => {
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su horario ha sido eliminado correctamente');
                    this.storage.setBusinessVerifiedByUser(success.response);
                    this.intentProvider.updateMyBusiness = true;
                    this.router.navigateByUrl('/app/tabs/my-business');
                } else {
                    this.toast.messageSuccessWithoutTabs('Su horario no se ha podido eliminar, intente de nuevo');
                }
                console.log('-> success', success);
                this.loading = false;
            })
            .catch(error => {
                this.updating = false;
                this.toast.messageErrorWithoutTabs('Tenemos problemas al procesar su solicitud. Intente de nuevo o compruebe su conexion a internet', 3500);
            });
    }

    private saveBusinessHours() {
        this.updating = true;
        console.log(this.businessHours);
        this.placesService.changeHours(this.place.id, this.businessHours)
            .then(success => {
                console.log('-> success', success);
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su horario ha sido agregado satisfactoriamente');
                    this.storage.setBusinessVerifiedByUser(success.response);
                    this.intentProvider.updateMyBusiness = true;
                } else {
                    this.toast.messageSuccessWithoutTabs('Su horario no se ha podido guardar, intente de nuevo');
                }
                this.updating = false;
            })
            .catch(error => {
                this.updating = false;
                this.toast.messageErrorWithoutTabs('Tenemos problemas al procesar su solicitud. Intente de nuevo o compruebe su conexion a internet', 3500);
            });
    }

    private toastEmpty(message = '') {
        this.toast.messageErrorWithoutTabs(`Debes colocar la hora de apertura y de cierre ${message}`, 3000);
    }

    private toastError(message = '') {
        this.toast.messageErrorWithoutTabs(`La hora de apertura no puede ser mayor a la hora de cierre ${message}`, 3000);
    }

    resetValues() {
        this.businessHours.monday = {active: true, hoursOne: {}, hoursTwo: {}};
        this.businessHours.tuesday = {active: true, hoursOne: {}, hoursTwo: {}};
        this.businessHours.wednesday = {active: true, hoursOne: {}, hoursTwo: {}};
        this.businessHours.thursday = {active: true, hoursOne: {}, hoursTwo: {}};
        this.businessHours.friday = {active: true, hoursOne: {}, hoursTwo: {}};
        this.businessHours.saturday = {active: true, hoursOne: {}, hoursTwo: {}};
        this.businessHours.sunday = {active: true, hoursOne: {}, hoursTwo: {}};
    }
}
