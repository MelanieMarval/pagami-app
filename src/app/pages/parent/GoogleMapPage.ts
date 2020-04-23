import {ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {GeolocationService} from '../../core/geolocation/geolocation.service';
import {PagamiGeo} from '../../core/geolocation/pagami.geo';
import {Place} from '../../core/api/places/place';
// @ts-ignore
import GoogleMaps = google.maps;
// @ts-ignore
import LatLng = google.maps.LatLng;
import { MAP_MODE } from '../../utils/Const';
import {PlaceUtils} from '../../utils/place.utils';
// // @ts-ignore
// import LatLngLiteral = google.maps.LatLngLiteral;
// // @ts-ignore
// import Map = google.maps.Map;
// // @ts-ignore
// import Marker = google.maps.Marker;
// // @ts-ignore
// import MapOptions = google.maps.MapOptions;
// @ts-ignore
// import Circle = google.maps.Circle;
// // @ts-ignore
// import LatLng = google.maps.LatLng;


const removeDefaultMarkers = [
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
            { visibility: 'off' }
        ]
    }
];

export class GoogleMapPage {

    @ViewChild('mapCanvas', {static: true}) mapElement: ElementRef;

    map: any;
    currentPositionMarker: any;
    currentPositionCircle: any;
    private nearbyPlaces: any[];
    // @ts-ignore
    googleMaps: any;
    accuracy: number;
    currentUrl: string;

    constructor(@Inject(DOCUMENT) private doc: Document, protected geolocationService: GeolocationService
    ) {
    }

    async loadMap() {
        try {
            this.googleMaps = await this.geolocationService.getGoogleMaps();
            const mapEle = this.mapElement.nativeElement;
            this.map = new this.googleMaps.Map(mapEle, this.getDefaultOptions());

            this.googleMaps.event.addListenerOnce(this.map, 'idle', () => {
                mapEle.classList.add('show-map');
                this.onMapReady();
                this.mapMoveSubscribe();
            });
        } catch (err) {
            // return a error
        }
    }

    private mapMoveSubscribe() {
        this.map.addListener('drag', () => {
            this.onMapMoved();
        });
    }

    onMapMoved() {
    }

    onMapReady() {
    }

    changeMapCenter(coords: PagamiGeo) {
        const position: any = {
            lat: coords.latitude,
            lng: coords.longitude
        };
        this.map.panTo(position);
    }

    setupMarkerCurrentPosition(coords: PagamiGeo) {
        const position: any = {
            lat: coords.latitude,
            lng: coords.longitude
        };
        const map = this.map;
        if (this.currentPositionMarker === undefined) {
            const icon: any = {
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
                fillColor: '#F6AD55',
                fillOpacity: 1,
                scale: 6,
                path: 0
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
                strokeColor: '#F6AD55',
                strokeWeight: 0.5,
                fillColor: '#FBD38D',
                fillOpacity: 0.2,
                map
            });
        } else {
            if (this.currentPositionMarker) {
                this.currentPositionMarker.setPosition(position);
            }
            if (this.currentPositionCircle) {
                this.currentPositionCircle.setRadius(/*coords.accuracy*/30);
                this.currentPositionCircle.setCenter(position);
            }
        }
    }

    onClickPlace(place: Place) {
    }

    setupPlaces(places: Place[]) {
        this.nearbyPlaces = [];
        const map = this.map;
        places.forEach((place: Place) => {
            const position: any = {
                lat: place.latitude,
                lng: place.longitude
            };
            const icon = {
                url: PlaceUtils.getMarker(place),
                scaledSize: new this.googleMaps.Size(30, 32)
            };

            const marker = new this.googleMaps.Marker({
                position,
                map,
                icon
            });
            marker.addListener('click', event => {
                const latlng = new GoogleMaps.LatLng(position.lat, position.lng);
                this.onClickPlace(place);
                if (this.currentUrl ===  MAP_MODE.SEARCH) {
                    this.map.setZoom(20);
                    this.offsetCenter(latlng, 0, 200);
                }
            });
            this.nearbyPlaces.push(marker);
        });
    }

    offsetCenter(latlng, offsetx, offsety) {
        const scale = Math.pow(2, this.map.getZoom());
        const worldCoordinateCenter = this.map.getProjection().fromLatLngToPoint(latlng);
        const pixelOffset = new GoogleMaps.Point((offsetx / scale) || 0, (offsety / scale) || 0);

        const worldCoordinateNewCenter = new GoogleMaps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );
        const newCenter = this.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
        this.map.setCenter(newCenter);
    }

    aleatorio(inferior, superior) {
        const resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
        return resAleatorio;
    }

    getDefaultOptions(): any {
        return {
            center: {
                lat: 10.4880104,
                lng: -66.8791885
            },
            zoom: 18,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: removeDefaultMarkers
        };
    }

    getDefaultOptionsLocked(): any {
        return {
            center: {
                lat: 10.4880104,
                lng: -66.8791885
            },
            zoom: 18,
            minZoom: 18,
            maxZoom: 18,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            draggable: false
        };
    }

    /**
     * return distance on meters
     */
    calculateDistance(front: LatLng, to: LatLng): number {
        return GoogleMaps.geometry.spherical.computeDistanceBetween(front, to);
    }

    toLatLng(lat: number, lng: number): GoogleMaps.LatLng {
        return new GoogleMaps.LatLng(lat, lng);
    }
}
