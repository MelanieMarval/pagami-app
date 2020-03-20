import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { getGoogleMaps, MapPage } from '../../parent/MapPage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DOCUMENT } from '@angular/common';
import { DrawerState } from '../../../modules/ion-bottom-drawer/drawer-state';
import { AppService } from '../../../services/app.service';
import { IonContent, IonFab, IonFabButton } from '@ionic/angular';

@Component({
    selector: 'app-close-to-me',
    templateUrl: 'close-to-me.html',
    styleUrls: ['close-to-me.scss']
})
export class CloseToMePage extends MapPage implements OnInit, AfterViewInit {

    fabAttached = true;
    bottomDrawer = {
        shouldBounce: true,
        disableDrag: false,
        distanceTop: 58,
        dockedHeight: 520,
        minimumHeight: 118,
        drawerState: DrawerState.Bottom,
        contentPosition: 0,
        hidden: false
    };
    bottomHeightChange: EventEmitter<number> = new EventEmitter<number>();

    textSearched = '';
    autocompleteService: any;
    places: any = [];

    @ViewChild('fab', {static: false, read: ElementRef}) private ionFab: ElementRef;

    constructor(
        private renderer: Renderer2,
        private appService: AppService,
        geolocation: Geolocation,
        @Inject(DOCUMENT) doc: Document) {
        super(geolocation, doc);
    }

    ngOnInit() {
        this.appService.showNearby.subscribe(() => {
            if (this.bottomDrawer.drawerState === DrawerState.Bottom
                || this.bottomDrawer.drawerState === DrawerState.Top) {
                this.bottomHeightChange.emit(118);
                this.renderer.setStyle(this.ionFab.nativeElement, 'transition', '0.25s ease-in-out');
                this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '-56px' + ')');
            }
        });
    }

    async ngAfterViewInit() {
        this.loadMap(true);
        this.googleMaps = await getGoogleMaps(
            'AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s'
        );
        this.autocompleteService = new this.googleMaps.places.AutocompleteService();
        this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '-56px' + ')');
    }

    onCurrentPositionChanged(position: any) {
        if (this.fabAttached) {
            this.setupMarkerCurrentPosition(position);
            this.changeMapCenter(position);
        }
    }

    onMapMoved() {
        this.fabAttached = false;
    }

    attachedPosition() {
        this.fabAttached = true;
        if (this.currentPositionMarker) {
            const position = this.currentPositionMarker.getPosition();
            this.changeMapCenter(position);
        }
    }

    onBottomSheetHide($event: boolean) {
        if ($event) {
            this.renderer.setStyle(this.ionFab.nativeElement, 'transition', '0.25s ease-in-out');
            this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '0px' + ')');
        }
    }

    searchPlace() {
        if (this.textSearched.length > 0) {
            console.log('entre');
            const config = {
                types: ['geocode'],
                input: this.textSearched
            };
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
                console.log('-> predictions', predictions);
                if (status === this.googleMaps.places.PlacesServiceStatus.OK && predictions) {
                    this.places = [];
                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }
            });
        } else {
            this.places = [];
        }
        console.log(this.places);
    }

    async setPlace(place) {
        console.log('-> place', place);
        this.textSearched = await place;
        this.places = [];
    }


}
