import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { auth } from 'firebase/app';
import { StorageProvider } from '../../providers/storage.provider';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class GoogleAuthService {

    private googleAuth = Plugins.GoogleAuth;

    constructor(private angularFireAuth: AngularFireAuth,
                private storageService: StorageProvider,
                public toastController: ToastController) { }

    async singIn(): Promise<any> {
        const googleUser = await this.googleAuth.signIn();
        const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
        const fireCredential = await this.angularFireAuth.auth.signInWithCredential(credential);
        await this.saveGoogleUser(googleUser);
        return await fireCredential.user.getIdToken();
    }

    async saveGoogleUser(googleUser: any) {
        await this.storageService.setGoogleUser({
            name: googleUser.givenName,
            lastname: googleUser.familyName,
            email: googleUser.email,
            photoUrl: googleUser.imageUrl,
            terms: false
        });
    }

    async singOut() {
        await this.angularFireAuth.auth.signOut();
        await this.googleAuth.signOut();
        return true;
    }

    async removeStorage() {
        await this.storageService.setPagamiUser(null);
        await this.storageService.setBusinessVerifiedByUser(null);
        await this.storageService.setLogged(false);
    }

    async getToken(): Promise<string> {
        return new Promise(async resolve => {
            try {
                const firebaseUser = this.angularFireAuth.auth.currentUser;
                if (firebaseUser) {
                    const sessionToken = await firebaseUser.getIdToken();
                    resolve(sessionToken);
                } else {
                    resolve(await this.refreshSession());
                }
            } catch (err) {
                await this.wait();
                const token: any = await this.callRefreshSessionAgain();
                resolve(token);
            }
        });
    }

    private async refreshSession() {
        const response = await this.googleAuth.refresh();
        const credential = auth.GoogleAuthProvider.credential(response.idToken);
        const fireCredential = await this.angularFireAuth.auth.signInWithCredential(credential);
        return await fireCredential.user.getIdToken();
    }


    private async callRefreshSessionAgain() {
        try {
            return await this.refreshSession();
        } catch (err) {
            return await this.toastTokenError();
        }
    }

    async toastTokenError() {
        return new Promise(async resolve => {
            const toast = await this.toastController.create({
                color: 'pagami-surface',
                cssClass: 'toast-bottom-custom',
                message: 'Error al intentar conectarse con Google',
                position: 'bottom',
                buttons: [
                    {
                        text: 'REINTENTAR',
                        role: 'cancel',
                        handler: () => {
                            this.callRefreshSessionAgain()
                                .then(token => {
                                    resolve(token);
                                });
                        }
                    }
                ]
            });

            // await toast.present();
        });
    }

    /**
     * Wait 5 seconds for call
     */
    private async wait() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    }
}
