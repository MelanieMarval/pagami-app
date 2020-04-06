import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Place } from '../core/api/places/place';


@Injectable({
    providedIn: 'root'
})
export class StorageInstance {

    // tslint:disable-next-line:variable-name
    private _placeToEdit: Place;
    // tslint:disable-next-line:variable-name
    private _placeEdited: Place;

    get placeEdited(): Place {
        return this._placeEdited;
    }

    set placeEdited(value: Place) {
        this._placeEdited = value;
    }

    get placeToEdit(): Place {
        return this._placeToEdit;
    }

    set placeToEdit(value: Place) {
        this._placeToEdit = value;
    }
}
