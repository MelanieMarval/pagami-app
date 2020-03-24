import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../tutorial/modal/modal';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/api/users/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-terms',
    templateUrl: 'terms.html',
    styleUrls: ['terms.scss']
})
export class TermsPage {

    termsAccepted = false;

    constructor(private storageService: StorageService,
                private route: Router, ) {
    }

    continueRegister() {
        let userNoRegister: User;
        this.storageService.getUserUnregistered()
            .then(async data => {
                userNoRegister = data;
                userNoRegister.terms = true;
                await this.storageService.setUserUnregistered(userNoRegister);
                await this.route.navigate(['/user-register']);
            });
    }

}
