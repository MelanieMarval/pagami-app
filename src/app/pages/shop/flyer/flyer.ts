import { Component, OnInit } from '@angular/core';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { Place } from '../../../core/api/places/place';
import { Flyer } from '../../../core/api/places/flyer';

@Component({
    selector: 'page-flyer',
    templateUrl: 'flyer.html',
    styleUrls: ['./flyer.scss'],
})

export class FlyerPage implements OnInit {

    loading: any;
    shop: Place;
    flyer: Flyer = {};

    constructor(private intentProvider: UserIntentProvider) {
    }

    async ngOnInit() {
        this.shop = this.intentProvider.placeToShow;
        this.flyer = this.shop.flyer;
    }

}
