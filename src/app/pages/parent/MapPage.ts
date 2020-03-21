import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
import { GeolocationService } from '../../core/geolocation/geolocation.service';

export class MapPage {

    @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

    map: Map;
    currentPositionMarker: Marker;
    currentPositionCircle: Circle;
    // @ts-ignore
    googleMaps: GoogleMaps;
    accuracy: number;

    constructor(@Inject(DOCUMENT) private doc: Document, protected geolocationService: GeolocationService
    ) {  }

    async loadMap(locked: boolean = false) {
        this.googleMaps = await this.geolocationService.getGoogleMaps();
        const mapEle = this.mapElement.nativeElement;
        this.map = new this.googleMaps.Map(mapEle, locked ? this.getDefaultOptionsLocked() : this.getDefaultOptions());

        this.googleMaps.event.addListenerOnce(this.map, 'idle', () => {
            mapEle.classList.add('show-map');
            this.onMapReady();
            this.mapMoveSubscribe();
        });
    }

    private mapMoveSubscribe() {
        this.map.addListener('drag', () => {
           this.onMapMoved();
        });
    }

    onMapMoved() { }

    onMapReady() { }

    changeMapCenter(coords: Coordinates) {
        const position: LatLng = {
            lat: coords.latitude,
            lng: coords.longitude
        };
        this.map.setCenter(position);
    }

    setupMarkerCurrentPosition(coords: Coordinates) {
        const position: LatLng = {
            lat: coords.latitude,
            lng: coords.longitude
        };
        const map = this.map;
        if (this.currentPositionMarker === undefined) {
            const icon: GoogleMaps.Symbol = {
                strokeColor : '#FFFFFF',
                strokeWeight: 2,
                fillColor : '#F6AD55',
                fillOpacity: 1,
                scale: 6,
                path: GoogleMaps.SymbolPath.CIRCLE
            };
            this.currentPositionMarker = new this.googleMaps.Marker({
                position,
                map,
                crossOnDrag: false,
                icon
            });
            this.currentPositionCircle = new this.googleMaps.Circle({
                center: position,
                radius: /*this.accuracy*/30, // in meters
                strokeColor : '#F6AD55',
                strokeWeight: 0.5,
                fillColor : '#FBD38D',
                fillOpacity: 0.2,
                map
            });
        } else {
            if (this.currentPositionMarker) {
                this.currentPositionMarker.setPosition(position);
            }
            if (this.currentPositionCircle) {
                this.currentPositionCircle.setRadius(coords.accuracy);
                this.currentPositionCircle.setCenter(position);
            }
        }
    }

    getDefaultOptions(): MapOptions {
        return {
            center: {
                lat: 10.4880104,
                lng: -66.8791885
            },
            zoom: 18,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };
    }

    getDefaultOptionsLocked(): MapOptions {
        return {
            center: {
                lat: 10.4880104,
                lng: -66.8791885
            },
            zoom: 21,
            minZoom: 21,
            maxZoom: 21,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            draggable: false
        };
    }
}
