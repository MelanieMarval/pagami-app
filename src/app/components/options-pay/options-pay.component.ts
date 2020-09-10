import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Plan } from '../../core/api/plans/plan';
import { MethodPayment } from '../../core/api/payments/MethodPayment';

@Component({
    selector: 'app-options-pay',
    templateUrl: './options-pay.component.html',
    styleUrls: ['./options-pay.component.scss'],
})
export class OptionsPayComponent implements OnInit {

    @Input() payMethods: MethodPayment;
    @Input() planSelected: Plan;

    constructor(private popoverController: PopoverController) {
    }

    ngOnInit() {
        console.log('-> payMethods', this.payMethods);
        console.log('-> planSelected', this.planSelected);
    }

    selectMethod(method: MethodPayment) {
        console.log('Pagare ahora');
        this.popoverController.dismiss({paymentSelected: method});
    }
}
