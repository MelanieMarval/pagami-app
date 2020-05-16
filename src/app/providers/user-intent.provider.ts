import { Injectable } from '@angular/core';
import { Place } from '../core/api/places/place';
import { Claim } from '../core/api/claim/claim';
import { PagamiGeo } from '../core/geolocation/pagami.geo';


@Injectable({
    providedIn: 'root'
})
export class UserIntentProvider {

    private _placeToEdit: Place;
    private _placeEdited: Place;
    private _placeToShow: Place;
    private _placeToClaim: Place;
    private _placeToChangeLocation: Place;
    private _showingPlaceDetails = false;
    private _lastUpdatedPoint: PagamiGeo;
    private _myBusinessId: string;

    get placeToEdit(): Place {
        return this._placeToEdit;
    }

    set placeToEdit(value: Place) {
        this._placeToEdit = value;
    }

    get placeEdited(): Place {
        return this._placeEdited;
    }

    set placeEdited(value: Place) {
        this._placeEdited = value;
    }

    get placeToShow(): Place {
        return this._placeToShow;
    }

    set placeToShow(value: Place) {
        this._placeToShow = value;
    }

    get placeToClaim(): Place {
        return this._placeToClaim;
    }

    set placeToClaim(value: Place) {
        this._placeToClaim = value;
    }

    get showingPlaceDetails(): boolean {
        return this._showingPlaceDetails;
    }

    set showingPlaceDetails(value: boolean) {
        this._showingPlaceDetails = value;
    }

    get lastUpdatedPoint(): PagamiGeo {
        return this._lastUpdatedPoint;
    }

    set lastUpdatedPoint(value: PagamiGeo) {
        this._lastUpdatedPoint = value;
    }


    get placeToChangeLocation(): Place {
        return this._placeToChangeLocation;
    }

    set placeToChangeLocation(value: Place) {
        this._placeToChangeLocation = value;
    }


    get myBusinessId(): string {
        return this._myBusinessId;
    }

    set myBusinessId(value: string) {
        this._myBusinessId = value;
    }
}
