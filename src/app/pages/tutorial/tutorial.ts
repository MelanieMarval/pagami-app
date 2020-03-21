import { Component, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../core/auth/auth.service';
import '@codetrix-studio/capacitor-google-auth';
import { auth } from 'firebase/app';
import { StorageService } from '../../core/storage/storage.service';
import { User } from '../../core/users/user';
import { RESPONSE } from '../../utils/Const';
import { Router } from '@angular/router';

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
        private angularFireAuth: AngularFireAuth,
        private authService: AuthService,
        private storageService: StorageService,
        private toastController: ToastController,
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
            const googleUser = await Plugins.GoogleAuth.signIn();
            const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
            const fireCredential = await this.angularFireAuth.auth.signInWithCredential(credential);
            const token = await fireCredential.user.getIdToken(false);
            this.authService.singIn(token).then(
                (success: any) => {
                    if (success.passed) {
                        this.onLoginSuccess(success.response, token);
                    } else {
                        if (success.code === RESPONSE.CODE.NOT_REGISTERED) {
                            this.onUserNotRegistered(token);
                        } else {
                            this.onUnknownError();
                        }
                    }
                }
            );
        } catch (e) {
            this.loading = false;
        }
    }

    async onLoginSuccess(user: User, token: string) {
        await this.storageService.setToken(token);
        await this.storageService.seUser(user);
        this.loading = false;
        this.route.navigate(['/app/tabs/close-to-me']);
    }

    async onUserNotRegistered(token: string) {
        await this.storageService.setToken(token);
        this.loading = false;
        this.route.navigate(['/terms']);
    }

    async onUnknownError() {
        const toast = await this.toastController.create({
            color: 'pagami-surface',
            duration: 2000,
            cssClass: 'toast-bottom-custom',
            message: 'Un error ha ocurrido',
            position: 'bottom',
        });

        await toast.present();
        this.loading = false;
    }
}
