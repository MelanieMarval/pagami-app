import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-terms',
    templateUrl: 'modal.html',
    styleUrls: ['../terms.scss']
})
export class ModalPage {

    termsAccepted = false;

    constructor(private modalController: ModalController) {
    }


}
