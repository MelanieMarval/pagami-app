import { Component, OnInit } from '@angular/core';
import { AlertProvider } from '../../../providers/alert.provider';

@Component({
    selector: 'app-wallet',
    templateUrl: 'wallet.html',
    styleUrls: ['wallet.scss']
})
export class WalletPage implements OnInit {

    empty: boolean;

    constructor(private alert: AlertProvider) {
    }

    ngOnInit(): void {
        this.empty = true;
    }

}
