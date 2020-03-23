import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/api/users/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-terms',
    templateUrl: 'terms.html',
    styleUrls: ['terms.scss']
})
export class TermsPage implements OnInit {

    termsAccepted = false;

    constructor(public modalController: ModalController,
                private storageService: StorageService,
                private route: Router,
                ) {
    }

    ngOnInit() {
        this.presentModal().then(r =>
            console.log('-> r', r)
        );
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalPage,
            animated: false,
            cssClass: 'modal-fade'
        });
        await modal.present();

        setTimeout(() => {
            // Close modal
            modal.dismiss();
        }, 5000);
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
