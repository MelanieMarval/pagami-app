import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StorageService } from './core/storage/storage.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
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
        private storageService: StorageService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            const isLogged = await this.storageService.isLogged();
            isLogged ? await this.openHome() : await this.openTutorial();
            await SplashScreen.hide();
        });
    }

    private openTutorial(): Promise<boolean> {
        return this.router.navigateByUrl('/tutorial');
    }

    private openHome(): Promise<boolean> {
        return this.router.navigateByUrl('/app/tabs/close-to-me/search');
    }
}
