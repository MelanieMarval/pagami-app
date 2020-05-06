import { Component, OnInit } from '@angular/core';
import { AlertProvider } from '../../../providers/alert.provider';
import { NotificationsProvider } from '../../../providers/notifications.provider';

@Component({
    selector: 'app-wallet',
    templateUrl: 'wallet.html',
    styleUrls: ['wallet.scss']
})
export class WalletPage implements OnInit {

    empty: boolean;
    hasNotification = false;

    constructor(private alert: AlertProvider,
                private notificationsProvider: NotificationsProvider) {
    }

    ngOnInit(): void {
        this.empty = true;
        this.hasNotification = this.notificationsProvider.hasWalletNotification;
        this.notificationsProvider.walletNotification.subscribe(next => {
            this.hasNotification = next;
        });
    }

}
