import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// @ts-ignore
import LatLng = google.maps.LatLng;
// @ts-ignore
import Map = google.maps.Map;
// @ts-ignore
import Marker = google.maps.Marker;


@Component({
    selector: 'app-close-to-me',
    templateUrl: 'close-to-me.html',
    styleUrls: ['close-to-me.scss']
})
export class CloseToMePage implements AfterViewInit, OnInit {

    @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

    map: Map;
    currentPosition: Marker;

    constructor(
        private geolocation: Geolocation,
        @Inject(DOCUMENT) private doc: Document
    ) {  }

    ngOnInit() { }

    async ngAfterViewInit() {
        const googleMaps = await getGoogleMaps(
            'AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s'
        );

        const mapOptions = {
            center: {
                lat: 10.4880104,
                lng: -66.8791885
            },
            zoom: 16,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        };
        const mapEle = this.mapElement.nativeElement;
        this.map = new googleMaps.Map(mapEle, mapOptions);
        const map = this.map;

        googleMaps.event.addListenerOnce(this.map, 'idle', () => {
            mapEle.classList.add('show-map');
            this.geolocation.getCurrentPosition().then((data) => {
                const position: LatLng = {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude
                };
                this.currentPosition = new googleMaps.Marker({
                    position,
                    map,
                    icon: 'assets/icon/current_position.png'
                });
                map.setCenter(position);
            }).catch((error) => {
                console.log('Error getting location', error);
            });
        });

        const watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            const position: LatLng = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            };
            if (this.currentPosition) {
                this.currentPosition.setPosition(position);
            }
            map.setCenter(position);
        });
    }
}

function getGoogleMaps(apiKey: string): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
        return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
            const googleModule2 = win.google;
            if (googleModule2 && googleModule2.maps) {
                resolve(googleModule2.maps);
            } else {
                reject('google maps not available');
            }
        };
    });
}
