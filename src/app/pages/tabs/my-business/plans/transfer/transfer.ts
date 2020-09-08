import { Component, Input, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../../providers/toast.provider';
import { PlansService } from '../../../../../core/api/plans/plans.service';
import { Plan } from '../../../../../core/api/plans/plan';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
    selector: 'page-transfer',
    templateUrl: 'transfer.html',
    styleUrls: ['./transfer.scss'],
})

export class TransferPage implements OnInit {

    @Input() planSelected: Plan;
    @Input() methodSelected;
    loading = false;
    showForm = false;
    slideOpts: any = {
        // preventInteractionOnTransition: true,
        // allowTouchMove: false,
        // onlyExternal: true
    };
    paymentPlan: Transfer = {};

    constructor(private toast: ToastProvider,
                private plansService: PlansService,
                private modalController: ModalController,
                private router: Router,
                private alertController: AlertController,
                private clipboard: Clipboard) {
    }

    ngOnInit() {
        console.log('-> planSelected', this.planSelected, this.methodSelected);
    }

    closeModal() {
        const data = {};
        this.modalController.dismiss(data);
    }

    async validateMyPaymentPlan() {
        const alert = await this.alertController.create({
            header: '¿Estás seguro de haber realizado la transferencia?',
            message: 'Sólo debes rellenar y enviar este formulario cuando tu transferencia haya sido realizada',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Sí, la realice',
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

    copyClipboard(numberAccount: string) {
        this.clipboard.copy(numberAccount).then(() =>
            this.toast.messageDefault('Numero de cuenta copiado en el portapapeles')
        );
    }
}

export interface Transfer {
    number?: string;
    date?: string;
    note?: string;
}
