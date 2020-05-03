import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Place } from '../../../../core/api/places/place';
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';
import {ActivatedRoute, Router} from '@angular/router';
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
    @Input() searchText = '';

    selectedCategory = 0;
    STATUS = PLACES.STATUS;
    messageDistance = PlaceUtils.getMessageDistance;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private intentProvider: UserIntentProvider) {
    }

    ngOnInit() { }

    savePlaceToShowDetails(place: Place) {
        this.intentProvider.placeToShow = place;
        this.intentProvider.showingPlaceDetails = true;
    }

    emitSelectedPlaceType() {
        this.changePlaceType.emit(/*this.selectedCategory === 0 ? PLACES.TYPE.STORE : PLACES.TYPE.SERVICE*/PLACES.TYPE.ALL);
    }

    getName(select: number) {
        return this.selectedCategory === 0 ? PLACES.TYPE.STORE : PLACES.TYPE.SERVICE;
    }
}
