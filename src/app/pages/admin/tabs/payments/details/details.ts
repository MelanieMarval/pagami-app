import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../../../core/api/payments/Payment';
import { PlacesService } from '../../../../../core/api/places/places.service';
import { PaymentsService } from '../../../../../core/api/payments/payments.service';
import { AlertController } from '@ionic/angular';
import { AdminIntentProvider } from '../../../../../providers/admin-intent.provider';
import { PlansService } from '../../../../../core/api/plans/plans.service';
import { Router } from '@angular/router';
import { Place } from '../../../../../core/api/places/place';
import { PlaceUtils } from '../../../../../utils/place.utils';
import { Plan } from '../../../../../core/api/plans/plan';
import { BrowserProvider } from '../../../../../providers/browser.provider';
import { PAYMENTS } from '../../../../../utils/Const';
import { ToastProvider } from '../../../../../providers/toast.provider';

@Component({
    selector: 'app-details',
    templateUrl: './details.html',
    styleUrls: ['./details.scss'],
})
export class DetailsPage implements OnInit {

    saving = false;
    saved = false;
    rejecting = false;
    rejectReason = '';
    payment: Payment;
    place: Place = {latitude: 0, longitude: 0};
    plan: Plan;
    loading: boolean;
    placeTypeSpanish = PlaceUtils.getTypeSpanish;
    updating: boolean;
    STATUS = PAYMENTS.STATUS;

    constructor(private placesService: PlacesService,
                private plansService: PlansService,
                private paymentsService: PaymentsService,
                private router: Router,
                private toast: ToastProvider,
                private alert: AlertController,
                private intentProvider: AdminIntentProvider,
                private browserProvider: BrowserProvider) {
    }

    ngOnInit() {
        this.payment = this.intentProvider.paymentToView;
        this.getPlace();
        console.log('-> this.payment', this.payment);
    }

    private getPlace() {
        this.loading = true;
        this.placesService.findById(this.payment.placeId)
            .then(success => {
                if (success.passed) {
                    this.getPlan();
                    this.place = success.response;
                    console.log('-> success.response', success.response);
                } else {
                    this.loading = false;
                    this.toast.messageErrorWithoutTabs('No se ha podido obtener la informacion a mostrar. Intente de nuevo!');
                }
            }, error => {
                this.loading = false;
                this.toast.messageErrorWithoutTabs('No se ha podido obtener la informacion a mostrar. Intente de nuevo!');
            });
    }

    private getPlan() {
        this.loading = true;
        this.plansService.findById(this.payment.planId)
            .then(success => {
                if (success.passed) {
                    this.loading = false;
                    // @ts-ignore
                    this.plan = success.response;
                    console.log('-> success.response', success.response);
                } else {
                    this.loading = false;
                    this.toast.messageErrorWithoutTabs('No se ha podido obtener la informacion a mostrar. Intente de nuevo!');
                }
            }, error => {
                this.loading = false;
                this.toast.messageErrorWithoutTabs('No se ha podido obtener la informacion a mostrar. Intente de nuevo!');
            });
        console.log('-> this.payment.planId', this.payment.planId);
    }

    async openConfirm() {
        const alert = await this.alert.create({
            header: 'Rechazar pago de plan',
            message: 'Este pago quedará como inválido, está seguro de no haberlo recibido?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Sí, seguro',
                    handler: () => {
                        this.changePaymentStatus(this.STATUS.REJECTED);
                    }
                }
            ]
        });
        await alert.present();
    }

    private changePaymentStatus(status: string) {
        this.updating = true;
        this.paymentsService.changeStatus(this.payment.id, status)
            .then(success => {
                console.log('-> success', success);
                if (success.passed) {
                    this.updating = false;
                    this.intentProvider.paymentChanged = this.payment;
                    this.toast.messageSuccessWithoutTabs(`El pago ha sido *${status === this.STATUS.REJECTED ? 'Rechazado' : 'Aceptado'}* satisfactoriamente`);
                    this.router.navigate(['/admin/tabs/payments']);
                } else {
                    this.updating = false;
                    this.toast.messageErrorWithoutTabs('No se ha podido obtener la informacion a mostrar. Intente de nuevo!');
                }
            }, error => {
                this.updating = false;
                this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
            });
    }
}
