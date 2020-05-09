import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { PlansService } from '../../../../core/api/plans/plans.service';
import { ApiResponse } from '../../../../core/api/api.response';
import { Plan } from '../../../../core/api/plans/plan';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';
import { Claim } from '../../../../core/api/claim/claim';
import { ClaimService } from '../../../../core/api/claim/claim.service';

@Component({
    selector: 'page-plans',
    templateUrl: 'plans.html',
    styleUrls: ['./plans.scss'],
})

export class PlansPage implements OnInit {

    loading = false;
    save = false;
    plans: Plan[];
    selectedPlan: string;
    claim: Claim;

    constructor(private toast: ToastProvider,
                private intentProvider: UserIntentProvider,
                private plansService: PlansService,
                private claimService: ClaimService) {
    }

    ngOnInit() {
        this.loading = true;
        // @ts-ignore
        this.claim = this.intentProvider.placeToClaim;
        this.plansService.getAll()
            .then((success: ApiResponse) => {
                console.log(success.response);
                this.loading = false;
                if (success.passed) {
                    this.selectedPlan = success.response.filter(plan => plan.amount === 0)[0].id;
                    this.plans = success.response;
                } else {
                    console.log('Los planes no se han podido cargar');
                }
            });
    }

    pay() {
        this.loading = true;
        if (this.selectedPlan) {
            this.claim.planSelectedId = this.selectedPlan;

            // this.claimService.claimBusiness(this.claim)
            //     .then(success => {
            //         this.loading = false;
            //         if (success.passed) {
            this.save = true;
            this.intentProvider.placeToClaim = undefined;
            this.toast.messageSuccessBottom('Gracias por tu compra. <br>La verificacion de tu empresa esta en camino!', 3000);
                //     } else {
                //         this.toast.messageErrorWithoutTabs('Hay problemas de conexion. Intente de nuevo.');
                //     }
                // });
        } else {
            this.loading = false;
            this.toast.messageErrorWithoutTabs('Debe seleccionar un plan para continuar');
        }
    }

}
