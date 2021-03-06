import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { StorageProvider } from './providers/storage.provider';
import { AlertProvider } from './providers/alert.provider';

import { USER } from './utils/Const';
import { User } from './core/api/users/user';
import { AuthService } from './core/api/auth/auth.service';
import { GoogleAuthService } from './core/google-auth/google-auth.service';
import { DrawerState } from './shared/ion-bottom-drawer/drawer-state';
import { MapProvider } from './providers/map.provider';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';


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
        private authService: AuthService,
        private googleAuthService: GoogleAuthService,
        private storageService: StorageProvider,
        private mapProvider: MapProvider,
        private alert: AlertProvider,
        private appMinimize: AppMinimize
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => this.start());
        App.addListener('backButton', () => {
            if (this.router.url === '/app/tabs/map/search'
                && (this.mapProvider.currentNearbyStatus === DrawerState.Top || this.mapProvider.currentNearbyStatus === DrawerState.Docked)) {
                this.mapProvider.hideNearby.emit();
            } else {
                if (this.verifyIfCanCloseApp(this.router.url)) {
                    this.appMinimize.minimize();
                    // IF IOS Should use another close method
                    // App.exitApp();
                }
            }
        });
    }

    private async start() {
        const isLogged = await this.storageService.isLogged();
        const user = await this.storageService.getPagamiUser();

        // this.router.navigateByUrl('/user-register', {replaceUrl: true});
        // return

        const lastUserVerification = await this.storageService.getLastUserVerification();
        if (isLogged && user) {
            if (user.type && user.type === USER.TYPE.ADMIN) {
                this.openAdminPanel();
            } else {
                this.openHome();
            }
            setTimeout(() => {
                this.verifyUser(user);
            }, 5000);
        } else {
            await this.openTutorial();
        }
        await setTimeout(async () => {
            await SplashScreen.hide();
        }, 1000);
    }

    private verifyUser(lastUser: User) {
        let user: User;
        this.authService.verify()
            .then(success => {
                user = success.response;
                this.storageService.setPagamiUser(user);
                this.storageService.setLastUserVerification(new Date());
                if (user.status !== USER.STATUS.DISABLED) {
                    if (lastUser.type === USER.TYPE.NORMAL) {
                        if (user.type === USER.TYPE.ADMIN) {
                            this.alert.alertChangedUserStatus('ascendido');
                            this.openAdminPanel();
                        }
                    } else {
                        if (user.type === USER.TYPE.NORMAL) {
                            this.alert.alertChangedUserStatus('descendido');
                            this.openHome();
                        }
                    }
                } else {
                    this.googleAuthService.singOut();
                    this.alert.alertChangedUserStatus('deshabilitado');
                    this.router.navigateByUrl('/tutorial');
                }
            });
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
