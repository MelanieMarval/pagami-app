import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastProvider } from '../../../../../providers/toast.provider';
import { PlansService } from '../../../../../core/api/plans/plans.service';
import { Plan } from '../../../../../core/api/plans/plan';
import { UserIntentProvider } from '../../../../../providers/user-intent.provider';
import { IonSlides, ModalController, PopoverController } from '@ionic/angular';
import { ConfigService } from '../../../../../core/api/config/config.service';

@Component({
    selector: 'page-plans',
    templateUrl: 'transfer.html',
    styleUrls: ['./transfer.scss'],
})

export class TransferPage implements OnInit {

    @Input() planSelected: Plan;
    loading = false;
    showForm = false;
    slideOpts: any = {
        // preventInteractionOnTransition: true,
        // allowTouchMove: false,
        // onlyExternal: true
    };
    paymentPlan: any = {};

    constructor(private toast: ToastProvider,
                private intentProvider: UserIntentProvider,
                private plansService: PlansService,
                private popoverController: PopoverController,
                private modalController: ModalController,
                private configService: ConfigService) {
    }

    ngOnInit() {
        // this.loading = true;
        console.log('-> planSelected', this.planSelected);
    }

    goNextPage() {
        this.showForm = true;
    }

    closeModal() {
        const data = {};
        this.modalController.dismiss(data);
    }

    validateMyPaymentPlan() {

    }
}
