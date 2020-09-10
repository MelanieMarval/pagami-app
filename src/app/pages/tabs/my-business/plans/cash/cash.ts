import { Component, Input, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../../providers/toast.provider';
import { PlansService } from '../../../../../core/api/plans/plans.service';
import { Plan } from '../../../../../core/api/plans/plan';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Payment } from '../../../../../core/api/payments/Payment';
import { MethodPayment } from '../../../../../core/api/payments/MethodPayment';
import { PaymentsService } from '../../../../../core/api/payments/payments.service';

@Component({
    selector: 'page-cash',
    templateUrl: 'cash.html',
    styleUrls: ['./cash.scss'],
})

export class CashPage implements OnInit {

    @Input() placeId: string;
    @Input() planSelected: Plan;
    @Input() methodSelected: MethodPayment;
    loading = false;
    payment: Payment;

    constructor(private toast: ToastProvider,
                private modalController: ModalController,
                private router: Router,
                private paymentsService: PaymentsService,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.payment = {
            type: this.methodSelected.id,
            planId: this.planSelected.id,
            placeId: this.placeId,
        };
    }

    closeModal() {
        const data = {};
        this.modalController.dismiss(data);
    }

    async validateMyPaymentPlan() {
        const alert = await this.alertController.create({
            header: '¿Estás seguro de haber entregado el pago?',
            message: 'Sólo debes rellenar y enviar este formulario cuando tu pago haya sido entregado a un administrador Pagami',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Sí, lo realice',
                    handler: () => {
                        if (this.payment.amount && this.payment.date) {
                            this.savePayment();
                            console.log(this.payment);
                        } else {
                            this.toast.messageDefault('El numero de referencia y la fecha son obligatorios');
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    savePayment() {
        this.loading = true;
        this.paymentsService.save(this.payment)
            .then(success => {
                this.loading = false;
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su pago ha sido registrado, espere mientras es verificado');
                    this.router.navigateByUrl('/app/tabs/my-business');
                    this.closeModal();
                } else {
                    this.toast.messageErrorWithoutTabs('No se ha podido registrar su pago. Intente de nuevo!');
                }
            }, error => {
                this.loading = false;
                this.toast.messageErrorWithoutTabs('No se ha podido registrar su pago. Intente de nuevo!');
            });
    }
}
