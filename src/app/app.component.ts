import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUrlOpen, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { StorageProvider } from './providers/storage.provider';
import { AlertProvider } from './providers/alert.provider';

import { USER } from './utils/Const';
import { User } from './core/api/users/user';


const {SplashScreen} = Plugins;
const {App} = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        private router: Router,
        private platform: Platform,
        private storageService: StorageProvider,
        private alert: AlertProvider
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            const isLogged = await this.storageService.isLogged();
            const user = await this.storageService.getPagamiUser();
            // const lastUserVerification = await this.storageService.getLastUserVerification();
            if (isLogged) {
                // await this.verifyUser(user);
            } else {
                await this.openTutorial();
            }
            await SplashScreen.hide();
        });
        App.addListener('backButton', async (data: AppUrlOpen) => {
            if (this.verifyIfCanCloseApp(this.router.url)) {
                App.exitApp();
            }
        });
    }

    private async verifyUser(user: User) {
        // this.storageService.setLastUserVerification(new Date());
        if (user.status !== USER.STATUS.DISABLED) {
            if (user.type && user.type === USER.TYPE.ADMIN) {
                await this.openAdminPanel();
            } else {
                await this.openHome();
            }
        } else {
            await this.alert.alertUserDisabled();
        }
    }

    private openTutorial(): Promise<boolean> {
        return this.router.navigateByUrl('/tutorial', {replaceUrl: true});
    }

    private openHome(): Promise<boolean> {
        return this.router.navigateByUrl('/app/tabs/map/search', {replaceUrl: true});
    }

    private openAdminPanel(): Promise<boolean> {
        return this.router.navigateByUrl('/admin/tabs/activity', {replaceUrl: true});
    }

    private verifyIfCanCloseApp(currentUrl: string): boolean {
        return currentUrl === '/admin/tabs/activity'
            || currentUrl === '/admin/tabs/businesses'
            || currentUrl === '/admin/tabs/records'
            || currentUrl === '/admin/tabs/users'
            || currentUrl === '/app/tabs/map/search'
            || currentUrl === '/app/tabs/my-business'
            || currentUrl === '/app/tabs/map/register-business'
            || currentUrl === '/app/tabs/wallet';
    }
}
