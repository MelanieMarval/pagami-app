import { Injectable } from '@angular/core';
import { Place } from '../core/api/places/place';
import { User } from '../core/api/users/user';


@Injectable({
    providedIn: 'root'
})
export class IntentProvider {

    private _placeToEdit: Place;
    private _placeEdited: Place;
    private _placeToShow: Place;

    // Admin
    private _placeToAccept: Place;
    private _returnPlaceToAccept: Place;
    private _userToEdit: User;

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

    // Admin
    get returnPlaceToAccept(): Place {
        return this._returnPlaceToAccept;
    }

    set returnPlaceToAccept(value: Place) {
        this._returnPlaceToAccept = value;
    }

    get placeToAccept(): Place {
        return this._placeToAccept;
    }

    set placeToAccept(value: Place) {
        this._placeToAccept = value;
    }

    get userToEdit(): User {
        return this._userToEdit;
    }

    set userToEdit(value: User) {
        this._userToEdit = value;
    }
}
