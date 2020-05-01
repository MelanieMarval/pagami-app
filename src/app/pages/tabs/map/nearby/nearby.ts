import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

    @Output() changePlaceType: EventEmitter<string> = new EventEmitter<string>();
    @Input() drawerState = 0;
    @Input() selectedPlace: Place = undefined;
    @Input() nearPlaces: Place[] = [];
    @Input() searching = false;

    selectedCategory = 0;
    STATUS = PLACES.STATUS;
    messageDistance = PlaceUtils.getMessageDistance;

    constructor(private router: Router,
                private intentProvider: UserIntentProvider) {
    }

    ngOnInit() { }

    async goToShopDetails(place: Place) {
        this.intentProvider.placeToShow = await place;
        this.intentProvider.showingPlaceDetails = true;
        await this.router.navigate(['app/tabs/map/shop']);
    }

    emitSelectedPlaceType() {
        this.changePlaceType.emit(this.selectedCategory === 0 ? PLACES.TYPE.STORE : PLACES.TYPE.SERVICE);
    }
}
