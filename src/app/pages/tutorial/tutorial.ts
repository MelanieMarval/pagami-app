import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/api/users/user';
import { RESPONSE } from '../../utils/Const';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../core/google-auth/google-auth.service';
import { AuthService } from '../../core/api/auth/auth.service';
import { PagamiToast } from '../../toast/pagami.toast';

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
        private storageService: StorageService,
        private toast: PagamiToast,
        private route: Router) {
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
        this.route.navigate(['/app/tabs/close-to-me']);
    }

    async onUserNotRegistered() {
        const userToRegister = await this.storageService.getGoogleUser();
        await this.storageService.setUserUnregistered(userToRegister);
        this.loading = false;
        this.route.navigate(['/terms']);
    }

    async onUnknownError() {
        this.toast.messageErrorWithoutTabs('Un error ha ocurrido');
        this.loading = false;
    }
}
