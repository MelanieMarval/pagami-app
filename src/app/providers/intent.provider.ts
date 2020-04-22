import { Injectable } from '@angular/core';
import { Place } from '../core/api/places/place';
import { User } from '../core/api/users/user';
import { Claim } from '../core/api/claim/claim';


@Injectable({
    providedIn: 'root'
})
export class IntentProvider {

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

// Admin
    private _placeToAccept: Place;
    private _returnPlaceToAccept: Place;
    private _claimToVerified: Claim;
    private _returnClaimToVerified: Claim;
    private _userToEdit: User;
    private _showNotification: boolean;

    get placeToAccept(): Place {
        return this._placeToAccept;
    }

    set placeToAccept(value: Place) {
        this._placeToAccept = value;
    }

    get returnPlaceToAccept(): Place {
        return this._returnPlaceToAccept;
    }

    set returnPlaceToAccept(value: Place) {
        this._returnPlaceToAccept = value;
    }

    get claimToVerified(): Claim {
        return this._claimToVerified;
    }

    set claimToVerified(value: Claim) {
        this._claimToVerified = value;
    }

    get returnClaimToVerified(): Claim {
        return this._returnClaimToVerified;
    }

    set returnClaimToVerified(value: Claim) {
        this._returnClaimToVerified = value;
    }

    get userToEdit(): User {
        return this._userToEdit;
    }

    set userToEdit(value: User) {
        this._userToEdit = value;
    }

    get showNotification(): boolean {
        return this._showNotification;
    }

    set showNotification(value: boolean) {
        this._showNotification = value;
    }
}
