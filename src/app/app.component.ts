import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StorageService } from './core/storage/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private router: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private storageService: StorageService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            const isLogged = await this.storageService.isLogged();
            isLogged ? await this.openHome() : await this.openTutorial();
            this.splashScreen.hide();
        });
    }

    openTutorial() {
        this.router.navigateByUrl('/tutorial');
    }

    openHome() {
        this.router.navigateByUrl('/app/tabs/close-to-me');
    }
}
