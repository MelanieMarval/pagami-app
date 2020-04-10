import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StorageProvider } from './providers/storage.provider';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { USER } from './utils/Const';
const { SplashScreen } = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        private router: Router,
        private platform: Platform,
        private storageService: StorageProvider
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            const isLogged = await this.storageService.isLogged();
            const user = await this.storageService.getPagamiUser();
            if (isLogged) {
                if (user.type && user.type === USER.TYPE.ADMIN) {
                    await this.openAdminPanel();
                } else {
                    await this.openHome();
                }
            } else {
                await this.openTutorial();
            }
            await SplashScreen.hide();
        });
    }

    private openTutorial(): Promise<boolean> {
        return this.router.navigateByUrl('/tutorial');
    }

    private openHome(): Promise<boolean> {
        return this.router.navigateByUrl('/app/tabs/map/search');
    }

    private openAdminPanel(): Promise<boolean> {
        return this.router.navigateByUrl('/admin/tabs/activity');
    }
}
