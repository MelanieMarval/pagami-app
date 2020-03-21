import { EventEmitter, Injectable } from '@angular/core';
import { Coordinates, Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    private watch: any;

    private coords: Coordinates;

    public locationChanged: EventEmitter<Coordinates> = new EventEmitter<Coordinates>();

    constructor(private geolocation: Geolocation) {
        this.coords = {
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
            accuracy: 30,
            latitude: 10.4880104,
            longitude: -66.8791885
        };
    }

    getCurrentLocation(): Coordinates {
        return this.coords;
    }

    enableLocation() {
        if (!this.watch) {
            this.watch = this.geolocation.watchPosition();
            this.watch.subscribe((data) => {
                if (data && data.coords) {
                    this.coords = data.coords;
                    this.locationChanged.emit(this.coords);
                }
            });
        }
    }
}
