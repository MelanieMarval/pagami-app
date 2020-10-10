import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';

const {CapacitorGoogleMaps} = Plugins;

@Component({
    selector: 'app-map-native',
    templateUrl: './map-native.page.html',
    styleUrls: ['./map-native.page.scss'],
})
export class MapNativePage implements OnInit {

    constructor() {
    }

    @ViewChild('map', {static: true}) mapView: ElementRef;

    ngOnInit() {
    }

    async ionViewDidEnter() {
        const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

        CapacitorGoogleMaps.create({
            width: Math.round(boundingRect.width),
            height: Math.round(boundingRect.height),
            x: Math.round(boundingRect.x),
            y: Math.round(boundingRect.y),
            latitude: -33.86,
            longitude: 151.20,
            zoom: 12,
        });

        CapacitorGoogleMaps.addListener('onMapReady', async () => {

            /*
              We can do all the magic here when map is ready
            */

            CapacitorGoogleMaps.addMarker({
                latitude: -33.86,
                longitude: 151.20,
                title: 'Custom Title',
                snippet: 'Custom Snippet',
            });

            CapacitorGoogleMaps.setMapType({
                type: 'normal',
            });
        });
    }

    ionViewWillLeave() {
        CapacitorGoogleMaps.close();
    }

}
