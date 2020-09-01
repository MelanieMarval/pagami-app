import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-options-pay',
    templateUrl: './options-pay.component.html',
    styleUrls: ['./options-pay.component.scss'],
})
export class OptionsPayComponent implements OnInit {

    @Input() payMethods: any;

    constructor(private popoverController: PopoverController) {
    }

    ngOnInit() {
        console.log('-> payMethods', this.payMethods);
    }

    pay() {
        console.log('Pagare ahora');
        this.popoverController.dismiss();
    }
}
