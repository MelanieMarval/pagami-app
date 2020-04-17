import { Component } from '@angular/core';
import { ToastProvider } from '../../../providers/toast.provider';

@Component({
    selector: 'page-plans',
    templateUrl: 'plans.html',
    styleUrls: ['./plans.scss'],
})

export class PlansPage {

    loading = false;
    save = false;
    free = true;

    constructor(private toast: ToastProvider) {
    }


    pay() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.save = true;
            this.toast.messageSuccessBottom('Gracias por tu compra. <br>La verificacion de tu empresa esta en camino!', 3000);
        }, 1500);
    }
}
