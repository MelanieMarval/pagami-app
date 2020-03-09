import {Component} from '@angular/core';

@Component({
    selector: 'app-business-details',
    templateUrl: 'business-details.html',
    styleUrls: ['business-details.scss']
})
export class BusinessDetailsPage {

    showWhatsapp = false;

    constructor() {
    }

    saveBusiness() {
        console.log('Quiero guardar esta empresa');
    }

}
