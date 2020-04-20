import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../providers/toast.provider';
import { PlansService } from '../../../core/api/plans/plans.service';
import { ApiResponse } from '../../../core/api/api.response';

@Component({
    selector: 'page-plans',
    templateUrl: 'plans.html',
    styleUrls: ['./plans.scss'],
})

export class PlansPage implements OnInit {

    loading = false;
    save = false;
    free = true;

    constructor(private toast: ToastProvider, private plansService: PlansService) {
    }

    ngOnInit() {
        this.plansService.getAll()
            .then((success: ApiResponse) => {
                console.log(success.response);
            });
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
