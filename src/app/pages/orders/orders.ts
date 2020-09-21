import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: 'orders.html',
    styleUrls: ['orders.scss']
})
export class OrdersPage {

    segmentSelected = 'products';

    constructor(private alertController: AlertController,
                private router: Router) {
    }

    openDetails(register: number) {
        this.router.navigateByUrl(`/app/orders/details/${register}`);
    }


}
