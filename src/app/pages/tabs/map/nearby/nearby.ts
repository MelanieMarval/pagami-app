import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../../../core/api/places/place';
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';
import { Router } from '@angular/router';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';

@Component({
    selector: 'app-nearby',
    templateUrl: 'nearby.html',
    styleUrls: ['nearby.scss']
})

export class NearbyPage implements OnInit {

    @Input() drawerState = 0;
    @Input() selectedPlace: Place = undefined;
    @Input() nearPlaces: Place[] = [];
    selectedCategory = 0;
    STATUS = PLACES.STATUS;
    messageDistance = PlaceUtils.getMessageDistance;

    constructor(private router: Router,
                private intentProvider: UserIntentProvider) {
    }

    ngOnInit() {
    }

    async goToShopDetails(place: Place) {
        this.intentProvider.placeToShow = await place;
        await this.router.navigate(['app/shop']);
    }
}
