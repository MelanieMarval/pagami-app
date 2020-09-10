import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../../../core/api/payments/payments.service';
import { Payment } from '../../../../core/api/payments/Payment';
import { Router } from '@angular/router';
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';

@Component({
    selector: 'app-admin-payments',
    templateUrl: 'payments.html',
    styleUrls: ['payments.scss']
})
export class PaymentsPage implements OnInit {

    loading = false;
    error = false;
    payments: Payment[] = [];

    constructor(private paymentsService: PaymentsService,
                private router: Router,
                private intentProvider: AdminIntentProvider) {
    }

    ngOnInit() {
        this.getPaymentsPending();
    }

    ionViewWillEnter() {
        if (this.intentProvider.paymentChanged) {
            const index = this.payments.indexOf(this.intentProvider.paymentChanged);
            this.payments.splice(index, 1);
            this.intentProvider.paymentChanged = null;
        }
    }

    private getPaymentsPending() {
        this.loading = true;
        this.paymentsService.getPending()
            .then(success => {
                if (success.passed) {
                    this.loading = false;
                    console.log('-> success', success);
                    this.payments = success.response;
                }
            });
    }

    reload() {
        this.getPaymentsPending();
    }

    openDetails(payment: Payment) {
        this.intentProvider.paymentToView = payment;
        this.router.navigate(['/admin/tabs/payments/details']);
    }
}
