import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { auth } from 'firebase/app';
import '@codetrix-studio/capacitor-google-auth';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class GoogleAuthService {

    private googleAuth = Plugins.GoogleAuth;

    constructor(private angularFireAuth: AngularFireAuth, private storageService: StorageService) { }

    async singIn(): Promise<any> {
        const googleUser = await this.googleAuth.signIn();
        const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
        const fireCredential = await this.angularFireAuth.auth.signInWithCredential(credential);
        await this.saveGoogleUser(googleUser);
        return await fireCredential.user.getIdToken();
    }

    async saveGoogleUser(googleUser: any) {
        await this.storageService.setGoogleUser({
            authenticationIdToken: googleUser.authentication.idToken,
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
        await this.storageService.setPagamiUser(null);
        await this.storageService.setLogged(false);
        return true;
    }

    async getToken(): Promise<string> {
        return new Promise(async resolve => {
            try {
                const firebaseUser = this.angularFireAuth.auth.currentUser;
                if (firebaseUser) {
                    const sessionToken = await firebaseUser.getIdToken();
                    resolve(sessionToken);
                } else {
                    const googleUser = await this.storageService.getGoogleUser();
                    const credential = auth.GoogleAuthProvider.credential(googleUser.authenticationIdToken);
                    const fireCredential = await this.angularFireAuth.auth.signInWithCredential(credential);
                    const sessionToken = await fireCredential.user.getIdToken();
                    resolve(sessionToken);
                }
            } catch (err) {
                resolve('');
            }
        });
    }
}
