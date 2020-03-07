import {Component} from '@angular/core';

@Component({
    selector: 'app-details-business',
    templateUrl: 'details-business.html',
    styleUrls: ['details-business.scss']
})
export class DetailsBusinessPage {

    showWhatsapp = false;

    constructor() {
    }

    saveBusiness() {
        console.log('Quiero guardar esta empresa');
    }

}
