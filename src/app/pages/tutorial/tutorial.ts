import { Component, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { StorageProvider } from '../../providers/storage.provider';
import { User } from '../../core/api/users/user';
import { RESPONSE, USER } from '../../utils/Const';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../core/google-auth/google-auth.service';
import { AuthService } from '../../core/api/auth/auth.service';
import { ToastProvider } from '../../providers/toast.provider';
import { ModalPage } from './modal/modal';

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
    styleUrls: ['./tutorial.scss'],
})

export class TutorialPage {

    @ViewChild('slides', {static: false}) slides: IonSlides;

    currentIndex: any = 0;
    loading = false;

    constructor(
        private googleAuthService: GoogleAuthService,
        private authService: AuthService,
        private storageService: StorageProvider,
        private toast: ToastProvider,
        private route: Router,
        private modalController: ModalController) {
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
            this.route.navigate(['/terms']).then(r => {
                setTimeout(() => {
                    modal.dismiss();
                }, 2000);
            });
        }, 4000);
    }

    slideDidChange() {
        this.slides.getActiveIndex().then(index => {
            this.currentIndex = index;
        });
    }

    async googleSignIn() {
        try {
            this.loading = true;
            await this.googleAuthService.singIn();
            this.authService.singIn().then(
                (success: any) => {
                    if (success.passed) {
                        this.onLoginSuccess(success.response);
                    } else {
                        if (success.code === RESPONSE.CODE.NOT_REGISTERED) {
                            this.onUserNotRegistered();
                        } else {
                            this.onUnknownError();
                        }
                    }
                }
            );
        } catch (err) {
            this.toast.messageErrorWithoutTabs(err.message);
            this.loading = false;
        }
    }

    async onLoginSuccess(pagamiUser: User) {
        await this.storageService.setPagamiUser(pagamiUser);
        await this.storageService.setLogged(true);
        this.loading = false;
        if (pagamiUser.type === USER.TYPE.ADMIN) {
            await this.route.navigate(['/admin/tabs/activity'], { replaceUrl: true });
        } else {
           await this.route.navigate(['/app/tabs/map/search'], { replaceUrl: true });
        }
    }

    async onUserNotRegistered() {
        const userToRegister = await this.storageService.getGoogleUser();
        await this.storageService.setUserUnregistered(userToRegister);
        this.loading = false;
        // this.presentModal().then();
        this.route.navigate(['/terms']);
    }

    async onUnknownError() {
        await this.toast.messageErrorWithoutTabs('Un error ha ocurrido');
        this.loading = false;
    }
}
