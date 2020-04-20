import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrawerState } from '../../../shared/ion-bottom-drawer/drawer-state';
import { PagamiGeo } from '../../../core/geolocation/pagami.geo';
import { Place } from '../../../core/api/places/place';
import { ApiResponse } from '../../../core/api/api.response';
import { PlaceFilter } from '../../../core/api/places/place.filter';
// Services
import { GoogleMapPage } from '../../parent/GoogleMapPage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { PlacesService } from '../../../core/api/places/places.service';
// Providers
import { MapProvider } from '../../../providers/map.provider';
import { AlertProvider } from '../../../providers/alert.provider';
import { ToastProvider } from '../../../providers/toast.provider';
import { StorageProvider } from '../../../providers/storage.provider';
import { IntentProvider } from '../../../providers/intent.provider';
import { MAP_MODE } from '../../../utils/Const';

@Component({
    selector: 'app-map-page',
    templateUrl: 'map-page.html',
    styleUrls: ['map-page.scss']
})
export class MapPage extends GoogleMapPage implements OnInit, AfterViewInit {

    @ViewChild('fab', {static: false, read: ElementRef}) private ionFab: ElementRef;

    fabAttached = true;
    bottomDrawer = {
        shouldBounce: true,
        disableDrag: false,
        distanceTop: 62,
        dockedHeight: 504,
        minimumHeight: 108,
        drawerState: DrawerState.Bottom,
        contentPosition: 0,
        hidden: false,
        showBackToolbar: false,
        disableScrollContent: true
    };
    bottomHeightChange: EventEmitter<number> = new EventEmitter<number>();
    isRegistering = false;
    beforeSaveLocation = true;
    saving = false;
    placeToSave: any;
    selectedPlace;
    nearPlaces: Place[] = [];
    searchPlaces: Place[] = [];
    findBusinessPlaces: Place[] = [];
    isSearching = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private storageService: StorageProvider,
        private toast: ToastProvider,
        private alert: AlertProvider,
        private intentProvider: IntentProvider,
        private placesService: PlacesService,
        private renderer: Renderer2,
        private appService: MapProvider,
        private storageInstance: IntentProvider,
        @Inject(DOCUMENT) doc: Document,
        protected geolocationService: GeolocationService) {
        super(doc, geolocationService);
    }

    ngOnInit() {
        this.router.events.subscribe(value => {
            if (value instanceof NavigationEnd) {
                this.currentUrl = value.url.substring(value.url.lastIndexOf('/') + 1);
                this.selectMode(this.currentUrl);
            }
        });
        this.appService.showNearby.subscribe(() => {
            this.selectMode(this.currentUrl);
        });
        this.appService.showRegister.subscribe(() => {
            this.selectMode(this.currentUrl);
        });
    }

    selectMode(mode: string) {
        switch (mode) {
            case MAP_MODE.FIND_BUSINESS:
                this.modeFindMyBusiness();
                break;
            case MAP_MODE.REGISTER_BUSINESS:
                this.modeRegister();
                break;
            case MAP_MODE.SEARCH:
                this.modeSearch();
                break;
        }
    }

    modeSearch() {
        this.isRegistering = false;
        if (this.bottomDrawer.drawerState === DrawerState.Bottom
            || this.bottomDrawer.drawerState === DrawerState.Top
            || (this.bottomDrawer.drawerState === DrawerState.Docked && this.router.url === '/app/tabs/map/search')) {
            this.bottomHeightChange.emit(108);
            this.renderer.setStyle(this.ionFab.nativeElement, 'transition', '0.25s ease-in-out');
            this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '-56px' + ')');
        }
    }

    modeRegister() {
        this.isRegistering = true;
        this.onBottomSheetHide(true);
        this.bottomHeightChange.emit(0);
        this.beforeSaveLocation = true;
        this.placeToSave = undefined;
        this.map.panTo(this.currentPositionMarker.getPosition());
        this.map.setZoom(20);
    }

    modeFindMyBusiness() {
        this.isRegistering = false;
        this.onBottomSheetHide(true);
        this.bottomHeightChange.emit(0);
        this.getAcceptedPlaces();
    }

    onClickPlace(place: Place) {
        this.selectedPlace = place;
        if (this.router.url === '/app/tabs/map/find-my-business') {
            this.intentProvider.placeToShow = undefined;
            this.intentProvider.placeToClaim = place;
            this.router.navigate(['app/shop']);
        } else {
            this.bottomDrawer.drawerState = DrawerState.Docked;
        }
    }

    onCurrentPositionChanged(coors: PagamiGeo) {
        if (this.fabAttached || this.isRegistering) {
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
        const geo: PagamiGeo = await this.geolocationService.getCurrentLocation();
        this.onCurrentPositionChanged(geo);
        this.getNearPlaces();
    }

    async getNearPlaces() {
        const geo: PagamiGeo = await this.geolocationService.getCurrentLocation();
        const filter: PlaceFilter = {
            latitude: geo.latitude,
            longitude: geo.longitude,
            radius: 1000
        };
        this.placesService.getNearby(filter).then((success: ApiResponse) => {
            if (success.passed) {
                this.searchPlaces = success.response;
                this.setupPlacesToDrawer(success.response);
                this.setupPlaces(success.response);
            }
        });
    }

    async getAcceptedPlaces() {
        this.placesService.getAllAccepted().then((success: ApiResponse) => {
            if (success.passed) {
                this.findBusinessPlaces = success.response;
                console.log(this.findBusinessPlaces)
            }
        });
    }

    setupPlacesToDrawer(places: Place[]) {
        places.forEach(place => {
            const latlng = this.toLatLng(
                place.latitude,
                place.longitude
            );
            place.distance = this.calculateDistance(
                this.currentPositionMarker.getPosition(),
                latlng
            );
        });
        this.nearPlaces = places;
    }

    onDrawerPositionChange(position: number) {
        this.bottomDrawer.showBackToolbar = this.bottomDrawer.distanceTop === position;
    }

    onScrollContent(position: number) {
        this.bottomDrawer.contentPosition = position;
    }

    onDrawerStateChange($event: DrawerState) {
        this.bottomDrawer.drawerState = $event;
    }

    async saveLocation() {
        this.saving = true;
        const coors = await this.geolocationService.getCurrentLocation();
        const place: Place = {
            latitude: coors.latitude,
            longitude: coors.longitude,
            accuracy: coors.accuracy,
        };
        this.placesService.save(place).then(
            async (success: any) => {
                if (success.passed === true) {
                    await this.toast.messageSuccessAboveButton('Ubicación guardada exitosamente');
                    this.placeToSave = success.response;
                    this.beforeSaveLocation = false;
                    this.saving = false;
                } else {
                    this.saving = false;
                    await this.toast.messageErrorWithoutTabs('No se ha guardar la ubicacion. Intente de nuevo!');
                }
            }
            , reason => {
                this.saving = false;
            });
    }

    navigateToBusinessDetails() {
        this.storageInstance.placeToEdit = this.placeToSave;
        this.beforeSaveLocation = true;
        this.placeToSave = undefined;
        this.saving = false;
    }

    onFocusSearch() {
        this.bottomDrawer.drawerState = DrawerState.Top;
        this.bottomDrawer.disableDrag = true;
        this.isSearching = true;
    }

    onFocusExit() {
        this.bottomDrawer.disableDrag = false;
        this.isSearching = false;
    }
}
