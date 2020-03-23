import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapPage } from '../../parent/MapPage';
import { DOCUMENT } from '@angular/common';
import { DrawerState } from '../../../modules/ion-bottom-drawer/drawer-state';
import { AppService } from '../../../services/app.service';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { PagamiGeo } from '../../../core/geolocation/pagami.geo';

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

    @ViewChild('fab', {static: false, read: ElementRef}) private ionFab: ElementRef;

    constructor(
        private renderer: Renderer2,
        private appService: AppService,
        @Inject(DOCUMENT) doc: Document,
        protected geolocationService: GeolocationService) {
        super(doc, geolocationService);
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

    onCurrentPositionChanged(coors: PagamiGeo) {
        if (this.fabAttached) {
            this.setupMarkerCurrentPosition(coors);
            this.changeMapCenter(coors);
        }
    }

    onMapMoved() {
        this.fabAttached = false;
    }

    async attachedPosition() {
        this.fabAttached = true;
        if (this.currentPositionMarker) {
            this.changeMapCenter(await this.geolocationService.getCurrentLocation());
        }
    }

    onBottomSheetHide($event: boolean) {
        if ($event) {
            this.renderer.setStyle(this.ionFab.nativeElement, 'transition', '0.25s ease-in-out');
            this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '0px' + ')');
        }
    }

    async ngAfterViewInit() {
        /**
         * moving floating button to initial position
         */
        this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '-56px' + ')');
        /**
         * load map and wait
         */
        await this.loadMap();
        /**
         * subscribing to current location changes
         */
        this.geolocationService.locationChanged.subscribe(
            (coors: PagamiGeo) => {
                this.onCurrentPositionChanged(coors);
            });
        /**
         * Enable watch location if status is disabled
         */
        this.geolocationService.enableLocation();
        /**
         * set center and marker position
         */
        this.onCurrentPositionChanged(await this.geolocationService.getCurrentLocation());
    }
}
