import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { PlansService } from '../../../../core/api/plans/plans.service';
import { ApiResponse } from '../../../../core/api/api.response';
import { Plan } from '../../../../core/api/plans/plan';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';
import { Claim } from '../../../../core/api/claim/claim';
import { ModalController, PopoverController } from '@ionic/angular';
import { OptionsPayComponent } from '../../../../components/options-pay/options-pay.component';
import { ConfigService } from '../../../../core/api/config/config.service';
import { TransferPage } from './transfer/transfer';
import { CashPage } from './cash/cash';

@Component({
    selector: 'page-plans',
    templateUrl: 'plans.html',
    styleUrls: ['./plans.scss'],
})

export class PlansPage implements OnInit {

    loading = false;
    save = false;
    plans: Plan[];
    paymentMethods: any[];
    selectedPlan: string;
    claim: Claim;

    constructor(private toast: ToastProvider,
                private intentProvider: UserIntentProvider,
                private plansService: PlansService,
                private popoverController: PopoverController,
                private modalController: ModalController,
                private configService: ConfigService) {
    }

    ngOnInit() {
        this.loading = true;
        // @ts-ignore
        this.plansService.getAll()
            .then((success: ApiResponse) => {
                this.loading = false;
                if (success.passed) {
                    this.plans = success.response;
                    this.getPayMethods();
                } else {
                    console.log('Los planes no se han podido cargar');
                }
            });
    }

    async pay(plan: Plan, i: number) {

        const popover = await this.popoverController.create({
            component: OptionsPayComponent,
            componentProps: {payMethods: this.paymentMethods, planSelected: plan}
        });
        await popover.present();
        const {data} = await popover.onDidDismiss();

        if (data) {
            const id = this.paymentMethods[data.paymentSelected].id;

            if (id !== 'googlePay') {
                const modal = await this.modalController.create({
                    component: id === 'transfer' ? TransferPage : CashPage,
                    componentProps: {planSelected: plan, methodSelected: this.paymentMethods[data.paymentSelected]}
                });
                return await modal.present();
            } else {
                console.log('No se que voy a hacer cuando le de a google pay');
            }
        }

        // this.loading = true;
        // if (this.selectedPlan) {
        //
        //     // this.claimService.claimBusiness(this.claim)
        //     //     .then(success => {
        //     //         this.loading = false;
        //     //         if (success.passed) {
        //     this.save = true;
        //     this.toast.messageDefault('Gracias por tu compra. <br>La verificacion de tu empresa esta en camino!', 'bottom', 3000);
        //     //     } else {
        //     //         this.toast.messageErrorWithoutTabs('Hay problemas de conexion. Intente de nuevo.');
        //     //     }
        //     // });
        // } else {
        //     this.loading = false;
        //     this.toast.messageErrorWithoutTabs('Debe seleccionar un plan para continuar');
        // }
    }

    counter(i: number) {
        return new Array(i);
    }

    private getPayMethods() {
        this.configService.getPayMethods()
            .then(async (success: ApiResponse) => {
                if (success.passed) {
                    this.paymentMethods = Object.values(success.response).filter(item => item !== 'payMethods');
                } else {
                    this.toast.messageErrorWithoutTabs('Tenemos problemas al procesar su solicitud');
                }
            }, error => {
                this.loading = false;
                this.toast.messageErrorWithoutTabs('Tenemos problemas al procesar su solicitud. Intente de nuevo o compruebe su conexion a internet', 3500);
            });
    }
}
