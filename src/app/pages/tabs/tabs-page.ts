import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-tabs-page',
    templateUrl: 'tabs-page.html',
    styleUrls: ['tabs-page.scss']
})
export class TabsPage {

    currentUrl;

    constructor(private appService: AppService, private router: Router) {
        router.events.subscribe((value: any) => {
            if (value instanceof NavigationEnd) {
                this.currentUrl = value.url;
                this.currentUrl = value.url.substring(value.url.lastIndexOf('/') + 1);
            }
        });
    }

    openNearby() {
        this.appService.showNearby.emit();
    }

    openRegister() {
        this.appService.showRegister.emit();
    }
}
