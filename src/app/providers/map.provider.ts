import { EventEmitter, Injectable } from '@angular/core';
import { DrawerState } from '../shared/ion-bottom-drawer/drawer-state';

@Injectable({
    providedIn: 'root'
})
export class MapProvider {

    public showNearby: EventEmitter<any> = new EventEmitter<any>();

    public showRegister: EventEmitter<any> = new EventEmitter<any>();

    public hideNearby: EventEmitter<any> = new EventEmitter<any>();

    private _currentNearbyStatus = DrawerState.Bottom;

    get currentNearbyStatus(): DrawerState {
        return this._currentNearbyStatus;
    }

    set currentNearbyStatus(value: DrawerState) {
        this._currentNearbyStatus = value;
    }
}
