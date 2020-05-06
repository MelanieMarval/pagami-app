import { Component, OnInit } from '@angular/core';
import { MapProvider } from '../../providers/map.provider';
import { NavigationEnd, Router } from '@angular/router';
import { NotificationsProvider } from '../../providers/notifications.provider';

@Component({
    selector: 'app-tabs-page',
    templateUrl: 'tabs-page.html',
    styleUrls: ['tabs-page.scss']
})
export class TabsPage implements OnInit {

    currentUrl = '';
    hasNotification = false;

    constructor(private appService: MapProvider,
                private notificationsProvider: NotificationsProvider,
                private router: Router) {
        router.events.subscribe((value: any) => {
            if (value instanceof NavigationEnd) {
                this.currentUrl = value.url;
                this.currentUrl = value.url.substring(value.url.lastIndexOf('/') + 1);
            }
        });
    }

    ngOnInit(): void {
        this.hasNotification = this.notificationsProvider.hasWalletNotification;
        this.notificationsProvider.walletNotification.subscribe(next => {
            this.hasNotification = next;
        });
        this.notificationsProvider.getNotifications();
    }

    openNearby() {
        this.appService.showNearby.emit();
    }

    openRegister() {
        this.appService.showRegister.emit();
    }
}
