import { Injectable } from '@angular/core';
import { Place } from '../core/api/places/place';
import { Claim } from '../core/api/claim/claim';


@Injectable({
    providedIn: 'root'
})
export class UserIntentProvider {

    private _placeToEdit: Place;
    private _placeEdited: Place;
    private _placeToShow: Place;
    private _placeToClaim: Place | Claim;

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

    get placeToClaim(): Place | Claim {
        return this._placeToClaim;
    }

    set placeToClaim(value: Place | Claim) {
        this._placeToClaim = value;
    }

}
