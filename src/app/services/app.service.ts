import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public showNearby: EventEmitter<any> = new EventEmitter<any>();

    public showRegister: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

}
