import { Component, Input, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../../providers/toast.provider';
import { PlansService } from '../../../../../core/api/plans/plans.service';
import { Plan } from '../../../../../core/api/plans/plan';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'page-cash',
    templateUrl: 'cash.html',
    styleUrls: ['./cash.scss'],
})

export class CashPage implements OnInit {

    @Input() planSelected: Plan;
    loading = false;
    paymentPlan: Cash = {};

    constructor(private toast: ToastProvider,
                private plansService: PlansService,
                private modalController: ModalController,
                private router: Router,
                private alertController: AlertController) {
    }

    ngOnInit() {
        console.log('-> planSelected', this.planSelected);
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
                        if (this.paymentPlan.number && this.paymentPlan.date) {
                            this.loading = true;
                            this.router.navigateByUrl('/app/tabs/my-business');
                            this.closeModal();
                            console.log(this.paymentPlan);
                        } else {
                            this.toast.messageDefault('El numero de referencia y la fecha son obligatorios');
                        }
                    }
                }
            ]
        });

        await alert.present();
    }
}

export interface Cash {
    number?: string;
    date?: string;
    note?: string;
}
