import { Component, OnInit } from '@angular/core';
import { Place } from '../../core/api/places/place';
import { PLACES, CLAIMS } from '../../utils/Const';
import { UserIntentProvider } from '../../providers/user-intent.provider';
import { Router } from '@angular/router';
import { AlertProvider } from '../../providers/alert.provider';
import { BrowserProvider } from '../../providers/browser.provider';


@Component({
    selector: 'app-shop',
    templateUrl: 'shop.html',
    styleUrls: ['shop.scss']
})
export class ShopPage implements OnInit {

    STATUS = PLACES.STATUS;
    claiming = false;
    isClaimed = true;
    place: Place = {latitude: 0, longitude: 0};
    CLAIMS = CLAIMS.STATUS;
    browser = this.browserProvider;

    constructor(private intentProvider: UserIntentProvider,
                private alert: AlertProvider,
                private browserProvider: BrowserProvider,
                private router: Router) {
    }

    ngOnInit(): void {
        if (this.intentProvider.placeToShow) {
            this.claiming = false;
            this.place = this.intentProvider.placeToShow;
            return;
        }
        if (this.intentProvider.placeToClaim) {
            this.claiming = true;
            // @ts-ignore
            this.place = this.intentProvider.placeToClaim;
            if (!this.place.claim || this.place.claim.status === this.CLAIMS.REJECTED) {
                this.isClaimed = false;
            } else {
                this.intentProvider.placeToClaim = undefined;
                this.isClaimed = true;
            }
        }
    }

}
