import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Place } from '../../../../core/api/places/place';
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';
import {ActivatedRoute, Router} from '@angular/router';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';
import { DrawerState } from '../../../../shared/ion-bottom-drawer/drawer-state';
import { MapProvider } from '../../../../providers/map.provider';

@Component({
    selector: 'app-nearby',
    templateUrl: 'nearby.html',
    styleUrls: ['nearby.scss']
})

export class NearbyPage implements OnInit, OnChanges {

    @Output() changePlaceType: EventEmitter<string> = new EventEmitter<string>();
    @Input() drawerState = 0;
    @Input() selectedPlace: Place = undefined;
    @Input() nearPlaces: Place[] = [];
    @Input() searching = false;
    @Input() searchText = '';
    @Output() changeDrawerState: EventEmitter<number> = new EventEmitter<number>();

    selectedCategory = 0;
    STATUS = PLACES.STATUS;
    messageDistance = PlaceUtils.getMessageDistance;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private mapProvide: MapProvider,
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

    shouldShowPlace(place: Place) {
        if (this.searchText && this.searchText.length > 0 && this.drawerState === DrawerState.Top) {
            return true;
        }
        if (this.selectedCategory === 0 && place.type === PLACES.TYPE.STORE) {
            return true;
        } else if (this.selectedCategory === 1 && place.type === PLACES.TYPE.SERVICE) {
            return true;
        } else {
            return false;
        }
    }

    onBarClick() {
        if (this.drawerState === DrawerState.Bottom) {
            this.changeDrawerState.emit(DrawerState.Top);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.drawerState) {
            this.mapProvide.currentNearbyStatus = changes.drawerState.currentValue;
        }
    }
}
