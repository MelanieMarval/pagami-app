import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AfterViewInit, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
// @ts-ignore
import GoogleMaps = google.maps;
// @ts-ignore
import LatLng = google.maps.LatLng;
// @ts-ignore
import Map = google.maps.Map;
// @ts-ignore
import Marker = google.maps.Marker;
// @ts-ignore
import MapOptions = google.maps.MapOptions;
// @ts-ignore
import Circle = google.maps.Circle;
// @ts-ignore
import places = google.maps.places;
// @ts-ignore
import Icon = google.maps.Icon;

export class MapPage {

    @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

    map: Map;
    currentPositionMarker: Marker;
    currentPositionCircle: Circle;
    // @ts-ignore
    googleMaps: GoogleMaps;
    accuracy: number;

    constructor(
        private geolocation: Geolocation,
        @Inject(DOCUMENT) private doc: Document
    ) {  }

    async loadMap(enableCurrentPosition: boolean) {
        this.googleMaps = await getGoogleMaps(
            'AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s'
        );
        const mapEle = this.mapElement.nativeElement;
        this.map = new this.googleMaps.Map(mapEle, this.getDefaultOptions());

        this.googleMaps.event.addListenerOnce(this.map, 'idle', () => {
            mapEle.classList.add('show-map');
            this.onMapReady();
            this.mapMoveSubscribe();
            if (enableCurrentPosition) {
                this.getCurrentPosition();
                this.enableCurrentPosition();
            }
        });
    }

    private mapMoveSubscribe() {
        this.map.addListener('drag', () => {
           this.onMapMoved();
        });
    }

    onMapMoved() { }

    onMapReady() { }

    getCurrentPosition() {
        this.geolocation.getCurrentPosition().then((data) => {
            const position: LatLng = {
            // @ts-ignore
                lat: data.coords.latitude,
            // @ts-ignore
                lng: data.coords.longitude
            };
            this.accuracy = data.coords.accuracy;
            this.onCurrentPositionChanged(position);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    enableCurrentPosition() {
        const watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            console.log(data);
            const position: LatLng = {
                // @ts-ignore
                lat: data.coords.latitude,
                // @ts-ignore
                lng: data.coords.longitude
            };
            this.onCurrentPositionChanged(position);
        });
    }

    onCurrentPositionChanged(position: LatLng) { }

    changeMapCenter(position: LatLng) {
        this.map.setCenter(position);
    }

    setupMarkerCurrentPosition(position: LatLng) {
        const map = this.map;
        if (this.currentPositionMarker === undefined) {
            this.currentPositionMarker = new this.googleMaps.Marker({
                position,
                map,
                icon: 'assets/icon/current_position.png',
            });
            this.currentPositionCircle = new this.googleMaps.Circle({
                center: position,
                radius: this.accuracy, // in meters
                strokeColor : '#F6AD55',
                strokeWeight: 0.5,
                fillColor : '#FBD38D',
                fillOpacity: 0.2,
                map
            });
        } else {
            this.currentPositionMarker.setPosition(position);
            this.currentPositionCircle.setRadius(this.accuracy);
            this.currentPositionCircle.setCenter(position);
        }
    }

    getDefaultOptions(): MapOptions {
        return {
            center: {
                lat: 10.4880104,
                lng: -66.8791885
            },
            zoom: 16,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };
    }
}

export function getGoogleMaps(apiKey: string): Promise<any> {
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
