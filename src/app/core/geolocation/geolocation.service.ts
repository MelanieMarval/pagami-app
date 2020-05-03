import { EventEmitter, Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// @ts-ignore
import GoogleMaps = google.maps;
import { StorageProvider } from '../../providers/storage.provider';
import { mapToGeoPoint, PagamiGeo } from './pagami.geo';

const defaultCoors = {
    latitude: 10.4880104,
    longitude: -66.8791885,
    accuracy: 30
};

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    private watch: any;

    private coords: PagamiGeo;
    // @ts-ignore
    private googleMaps: GoogleMaps = undefined;

    public locationChanged: EventEmitter<PagamiGeo> = new EventEmitter<PagamiGeo>();

    constructor(private geolocation: Geolocation, private storageService: StorageProvider) { }

    async getCurrentLocation(): Promise<PagamiGeo> {
        return new Promise(async resolve => {
            if (this.coords) {
                resolve(this.coords);
            } else {
                const lastCoors = await this.storageService.getLastCurrentCoors();
                this.getCurrentPosition();
                resolve(lastCoors ? lastCoors : defaultCoors);
            }
        });
    }

    private getCurrentPosition() {
        this.geolocation.getCurrentPosition().then((data) => {
            this.setCoors(mapToGeoPoint(data.coords));
        });
    }

    private setCoors(coors: PagamiGeo) {
        this.coords = coors;
        this.storageService.setCurrentCoors(coors)
            .then(() => this.locationChanged.emit(this.coords));
    }

    enableLocation() {
        if (!this.watch) {
            this.watch = this.geolocation.watchPosition();
            this.watch.subscribe((data) => {
                if (data && data.coords) {
                    this.setCoors(mapToGeoPoint(data.coords));
                }
            });
        }
    }

    async getGoogleMaps(): Promise<GoogleMaps> {
        return new Promise(async resolve => {
            try {
                if (!this.googleMaps) {
                    this.googleMaps = await this.initGoogleMaps(
                        'AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s'
                    );
                }
                resolve(this.googleMaps);
            } catch (e) {
                resolve(undefined);
            }
        });
    }

    initGoogleMaps(apiKey: string): Promise<any> {
        const win = window as any;
        const googleModule = win.google;
        if (googleModule && googleModule.maps) {
            return Promise.resolve(googleModule.maps);
        }

        return new Promise((resolve, reject) => {
            const script: any = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = () => {
                const googleModule2 = win.google;
                if (googleModule2 && googleModule2.maps) {
                    resolve(googleModule2.maps);
                } else {
                    reject('google-auth maps not available');
                }
            };
        });
    }


}
