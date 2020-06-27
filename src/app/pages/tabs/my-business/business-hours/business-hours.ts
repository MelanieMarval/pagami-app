import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
// Services
import { GeolocationService } from '../../../../core/geolocation/geolocation.service';
import { PlacesService } from '../../../../core/api/places/places.service';
import { FireStorage } from '../../../../core/fire-storage/fire.storage';
import { Place } from '../../../../core/api/places/place';
// Providers
import { StorageProvider } from '../../../../providers/storage.provider';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';
// Utils
import { BusinessHours } from '../../../../core/api/places/business-hours';
import { WeedDayHours } from '../../../../core/api/places/weed-day-hours';
import { HourType } from '../../../../domain/enums/hour-type.enum';
import { ValidationUtils } from '../../../../utils/validation.utils';

@Component({
    selector: 'page-flyer',
    templateUrl: 'business-hours.html',
    styleUrls: ['./business-hours.scss'],
})

export class BusinessHoursPage implements OnInit {

    private place: Place;
    hourType = HourType;
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
                private router: Router) {
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
        if (!this.businessHours.type) {
            return this.toast.messageErrorWithoutTabs('Debe seleccionar su tipo de horario y rellenarlo');
        }
        switch (this.businessHours.type) {
            case 1:
                this.validateType1();
                break;
            case 2:
                this.validateType2();
                break;
            case 3:
                this.validateType3();
                break;
        }
    }

    validateType1() {
        if (!ValidationUtils.validateEmptyHours(this.businessHours.monday)) {
            return this.toastEmpty();
        }
        if (!ValidationUtils.validateDay(this.businessHours.monday.hoursOne)) {
            return this.toastError('');
        }
        if (!this.businessHours.monday.breakTime) {
            this.businessHours.monday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.monday.hoursTwo)) {
                return this.toastError('verifique el 2do turno');
            }
        }
        this.businessHours.tuesday = this.businessHours.monday;
        this.businessHours.wednesday = this.businessHours.monday;
        this.businessHours.thursday = this.businessHours.monday;
        this.businessHours.friday = this.businessHours.monday;
        this.businessHours.saturday = this.businessHours.monday;
        this.businessHours.sunday = this.businessHours.monday;
        this.saveBusinessHours();
    }

    validateType2() {
        const {monday, saturday, sunday} = this.businessHours;
        // Validate empty
        if (!ValidationUtils.validateEmptyHours(monday)) {
            return this.toastEmpty('de lunes a viernes');
        }
        if (!ValidationUtils.validateEmptyHours(saturday)) {
            return this.toastEmpty('para el dia sabado o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(sunday)) {
            return this.toastEmpty('para el dia domingo o marcarlo como cerrado');
        }
        // Validate hour range
        if (!ValidationUtils.validateDay(this.businessHours.monday.hoursOne)) {
            return this.toastError('verifique de lunes a viernes');
        }
        if (!this.businessHours.monday.breakTime) {
            this.businessHours.monday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.monday.hoursTwo)) {
                return this.toastError('verifique el 2do turno de lunes a viernes');
            }
        }
        if (!saturday.active) {
            this.businessHours.saturday.hoursOne = {};
            this.businessHours.saturday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.saturday.hoursOne)) {
                return this.toastError('verifique el sábado');
            }
            if (!this.businessHours.saturday.breakTime) {
                this.businessHours.saturday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.saturday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del sábado');
                }
            }
        }
        if (!sunday.active) {
            this.businessHours.sunday.hoursOne = {};
            this.businessHours.sunday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.sunday.hoursOne)) {
                return this.toastError('verifique el domingo');
            }
            if (!this.businessHours.sunday.breakTime) {
                this.businessHours.sunday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.sunday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del domingo');

                }
            }
        }
        this.businessHours.tuesday = monday;
        this.businessHours.wednesday = monday;
        this.businessHours.thursday = monday;
        this.businessHours.friday = monday;
        this.saveBusinessHours();
    }

    validateType3() {
        const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.businessHours;
        // Validate empty
        if (!ValidationUtils.validateEmptyHours(monday)) {
            return this.toastEmpty('para el dia lunes o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(tuesday)) {
            return this.toastEmpty('para el dia martes o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(wednesday)) {
            return this.toastEmpty('para el dia miércoles o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(thursday)) {
            return this.toastEmpty('para el dia jueves o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(friday)) {
            return this.toastEmpty('para el dia viernes o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(saturday)) {
            return this.toastEmpty('para el dia sábado o marcarlo como cerrado');
        }
        if (!ValidationUtils.validateEmptyHours(sunday)) {
            return this.toastEmpty('para el dia domingo o marcarlo como cerrado');
        }
        // Validate hour range
        if (!monday.active) {
            this.businessHours.monday.hoursOne = {};
            this.businessHours.monday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.monday.hoursOne)) {
                return this.toastError('verifique el día lunes');
            }
            if (!this.businessHours.monday.breakTime) {
                this.businessHours.monday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.monday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día lunes');
                }
            }
        }
        if (!tuesday.active) {
            this.businessHours.tuesday.hoursOne = {};
            this.businessHours.tuesday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.tuesday.hoursOne)) {
                return this.toastError('verifique el día martes');
            }
            if (!this.businessHours.tuesday.breakTime) {
                this.businessHours.tuesday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.tuesday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día martes');
                }
            }
        }
        if (!wednesday.active) {
            this.businessHours.wednesday.hoursOne = {};
            this.businessHours.wednesday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.wednesday.hoursOne)) {
                return this.toastError('verifique el día miércoles');
            }
            if (!this.businessHours.wednesday.breakTime) {
                this.businessHours.wednesday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.wednesday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día miércoles');
                }
            }
        }
        if (!thursday.active) {
            this.businessHours.thursday.hoursOne = {};
            this.businessHours.thursday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.thursday.hoursOne)) {
                return this.toastError('verifique el día jueves');
            }
            if (!this.businessHours.thursday.breakTime) {
                this.businessHours.thursday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.thursday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día jueves');
                }
            }
        }
        if (!friday.active) {
            this.businessHours.friday.hoursOne = {};
            this.businessHours.friday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.friday.hoursOne)) {
                return this.toastError('verifique el día viernes');
            }
            if (!this.businessHours.friday.breakTime) {
                this.businessHours.friday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.friday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día viernes');
                }
            }
        }
        if (!saturday.active) {
            this.businessHours.saturday.hoursOne = {};
            this.businessHours.saturday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.saturday.hoursOne)) {
                return this.toastError('verifique el día sábado');
            }
            if (!this.businessHours.saturday.breakTime) {
                this.businessHours.saturday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.saturday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día sábado');
                }
            }
        }
        if (!sunday.active) {
            this.businessHours.sunday.hoursOne = {};
            this.businessHours.sunday.hoursTwo = {};
        } else {
            if (!ValidationUtils.validateDay(this.businessHours.sunday.hoursOne)) {
                return this.toastError('verifique el día domingo');
            }
            if (!this.businessHours.sunday.breakTime) {
                this.businessHours.sunday.hoursTwo = {};
            } else {
                if (!ValidationUtils.validateDay(this.businessHours.sunday.hoursTwo)) {
                    return this.toastError('verifique el 2do turno del día domingo');

                }
            }
        }

        this.saveBusinessHours();
    }

    parseDateToTime(event: any, hours?, type?) {
        let time: any;
        const date = event.split(':');
        if (date.length > 3) {
            let hour = new Date(event).getHours().toString();
            hour = hour.length === 1 ? `0${hour}` : hour;
            let minutes = new Date(event).getMinutes().toString();
            minutes = minutes.length === 1 ? `0${minutes}` : minutes;
            time = `${hour}:${minutes}:00`;
        } else {
            time = event;
        }
        if (type === HourType.FROM) {
            hours.from = time;
        }
        if (type === HourType.TO) {
            hours.to = time;
        }
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
                    this.router.navigateByUrl('/app/tabs/my-business');
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
