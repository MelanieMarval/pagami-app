import {AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DrawerState} from '../../../shared/ion-bottom-drawer/drawer-state';
import {Place} from '../../../core/api/places/place';
import {ApiResponse} from '../../../core/api/api.response';
import {PlaceFilter} from '../../../core/api/places/place.filter';
// Services
import {GoogleMapPage} from '../../parent/GoogleMapPage';
import {GeolocationService} from '../../../core/geolocation/geolocation.service';
import {PlacesService} from '../../../core/api/places/places.service';
import {MAP_MODE, PLACES} from '../../../utils/Const';
// Providers
import {MapProvider} from '../../../providers/map.provider';
import {AlertProvider} from '../../../providers/alert.provider';
import {ToastProvider} from '../../../providers/toast.provider';
import {StorageProvider} from '../../../providers/storage.provider';
import {UserIntentProvider} from '../../../providers/user-intent.provider';
import {PagamiGeo} from '../../../core/geolocation/pagami.geo';
import {AlertController} from '@ionic/angular';

const DEFAULT_DRAWER_BOTTOM_HEIGHT = 104;
const BASIC_RADIUS_KILOMETERS = 50;
const BASIC_UPDATE_METERS = 10;

@Component({
    selector: 'app-map-page',
    templateUrl: 'map-page.html',
    styleUrls: ['map-page.scss']
})
export class MapPage extends GoogleMapPage implements OnInit, AfterViewInit {

    @ViewChild('fab', {static: false, read: ElementRef}) private ionFab: ElementRef;

    placeTypeSelected = PLACES.TYPE.ALL;
    searching = false;

    fabAttached = true;
    bottomDrawer = {
        shouldBounce: true,
        disableDrag: false,
        distanceTop: 62,
        dockedHeight: 494,
        minimumHeight: DEFAULT_DRAWER_BOTTOM_HEIGHT,
        drawerState: DrawerState.Bottom,
        contentPosition: 0,
        hidden: false,
        showBackToolbar: false,
        disableScrollContent: true
    };
    bottomHeightChange: EventEmitter<number> = new EventEmitter<number>();
    beforeSaveLocation = true;
    saving = false;
    placeToSave: any;
    selectedPlace: Place;
    nearPlaces: Place[] = [];
    searchPlaces: Place[] = [];
    findBusinessPlaces: Place[] = [];
    isSearching = false;
    isHiddenCloseToMe = false;
    searchText: '';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private storageService: StorageProvider,
        private toast: ToastProvider,
        private alert: AlertProvider,
        private intentProvider: UserIntentProvider,
        private placesService: PlacesService,
        private renderer: Renderer2,
        private appService: MapProvider,
        private storageInstance: UserIntentProvider,
        private alertController: AlertController,
        @Inject(DOCUMENT) doc: Document,
        protected geolocationService: GeolocationService) {
        super(doc, geolocationService);
    }

    ngOnInit() {
        this.router.events.subscribe(value => {
            if (value instanceof NavigationEnd) {
                const url = value.url.substring(value.url.lastIndexOf('/') + 1);
                this.selectNavigateMode(url);
                this.currentUrl = url;
            }
        });
        this.appService.showNearby.subscribe(() => {
            if (this.currentUrl === MAP_MODE.SEARCH) {
                this.closeToMeToDefault();
            }
        });
        this.appService.showRegister.subscribe(() => {
            // this.selectMode(this.currentUrl);
        });
    }

    selectNavigateMode(mode: string) {
        switch (mode) {
            case MAP_MODE.FIND_BUSINESS:
                this.navigateToModeFindMyBusiness();
                break;
            case MAP_MODE.REGISTER_BUSINESS:
                this.navigateToModeRegister();
                break;
            case MAP_MODE.SEARCH:
                this.navigateToModeSearch();
                break;
            case MAP_MODE.EDIT_BUSINESS:
                this.navigateToModeEditBusiness();
                break;
        }
    }

    navigateToModeSearch() {
        this.isRegistering = false;
        this.isFindMyBusiness = false;
        this.isEditingBusiness = false;
        if (this.isHiddenCloseToMe) {
            this.closeToMeToDefault();
            this.isHiddenCloseToMe = false;
        }
        if (this.storageInstance.showingPlaceDetails) {
            this.storageInstance.showingPlaceDetails = false;
        }
        if (this.newPlaceMarker) {
            this.newPlaceMarker.setMap(null);
        }
        if (this.editPlaceMarker) {
            this.editPlaceMarker.setMap(null);
        }
    }

    navigateToModeRegister() {
        this.isRegistering = true;
        this.isFindMyBusiness = false;
        this.isHiddenCloseToMe = true;
        this.onBottomSheetHide(true);
        this.bottomHeightChange.emit(0);
        this.beforeSaveLocation = true;
        this.placeToSave = undefined;
        this.map.panTo(this.currentPositionMarker.getPosition());
        this.map.setZoom(20);
        this.addMarkerNewPlace();
        this.toast.messageSuccessAboveButton('Puedes mover un poco el marcador si lo necesitas', 3000);
        if (this.editPlaceMarker) {
            this.editPlaceMarker.setMap(null);
        }
    }

    navigateToModeFindMyBusiness() {
        this.isRegistering = false;
        this.isFindMyBusiness = true;
        this.isHiddenCloseToMe = true;
        this.onBottomSheetHide(true);
        this.bottomHeightChange.emit(0);
        if (this.newPlaceMarker) {
            this.newPlaceMarker.setMap(null);
        }
        if (this.editPlaceMarker) {
            this.editPlaceMarker.setMap(null);
        }
        this.enableFindMyBusiness();
    }

    navigateToModeEditBusiness() {
        const place = this.intentProvider.placeToChangeLocation;
        this.isRegistering = false;
        this.isFindMyBusiness = false;
        this.isHiddenCloseToMe = true;
        this.isEditingBusiness = true;
        this.onBottomSheetHide(true);
        this.bottomHeightChange.emit(0);
        if (this.newPlaceMarker) {
            this.newPlaceMarker.setMap(null);
        }
        this.map.panTo(this.toLatLng(place.latitude, place.longitude));
        this.map.setZoom(20);
        this.addMarkerEditPlace(place);
        this.toast.messageSuccessAboveButton('Arrastra tu empresa a su nueva ubicación', 3000);
    }

    closeToMeToDefault() {
        this.isRegistering = false;
        this.isHiddenCloseToMe = false;
        this.isSearching = false;
        this.isFindMyBusiness = false;
        this.bottomHeightChange.emit(DEFAULT_DRAWER_BOTTOM_HEIGHT);
        this.renderer.setStyle(this.ionFab.nativeElement, 'transition', '0.25s ease-in-out');
        this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '-56px' + ')');
    }

    onClickPlace(place: Place) {
        this.selectedPlace = place;
        if (this.currentUrl === MAP_MODE.FIND_BUSINESS) {
            if (place.status === PLACES.STATUS.ACCEPTED) {
                this.intentProvider.placeToShow = undefined;
                this.intentProvider.placeToClaim = place;
                this.router.navigate(['app/shop']);
            } else {
                this.toast.messageInfoForMap('No puede reclamar esta empresa <br>Ya ha sido reclamada.', 2000);
            }
        } else if (this.currentUrl === MAP_MODE.SEARCH) {
            this.fabAttached = false;
            this.bottomDrawer.drawerState = DrawerState.Docked;
        }
    }

    onCurrentPositionChanged(coors: PagamiGeo) {
        this.setupMarkerCurrentPosition(coors);
        if ((this.fabAttached || this.isRegistering) && !this.isEditingBusiness) {
            this.changeMapCenter(coors);
        }
        if (this.intentProvider.lastUpdatedPoint && this.intentProvider.lastUpdatedPoint.latitude) {
            if (this.calculateDistance(this.geoToLatLng(coors), this.geoToLatLng(this.intentProvider.lastUpdatedPoint)) > BASIC_UPDATE_METERS) {
                this.getNearPlaces();
            }
        } else {
            this.getNearPlaces();
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
        if (this.searching) {
            return;
        }
        this.searching = true;
        const geo: PagamiGeo = await this.geolocationService.getCurrentLocation();
        const filter: PlaceFilter = {
            latitude: geo.latitude,
            longitude: geo.longitude,
            radius: BASIC_RADIUS_KILOMETERS
        };
        if (this.placeTypeSelected !== PLACES.TYPE.ALL) {
            filter.placeType = this.placeTypeSelected;
        }
        this.placesService.getNearby(filter).then((success: ApiResponse) => {
            if (success.passed) {
                this.searchPlaces = success.response;
                this.setupPlacesToDrawer(this.searchPlaces);
                this.setupPlacesToMap(this.searchPlaces);
                this.intentProvider.lastUpdatedPoint = geo;
            }
        }).finally(() => this.searching = false);
    }

    async getAcceptedPlaces() {
        this.placesService.getAllAccepted().then((success: ApiResponse) => {
            if (success.passed) {
                this.findBusinessPlaces = success.response;
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
        places.sort((a, b) => a.distance - b.distance);
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
        if (this.bottomDrawer.drawerState === DrawerState.Bottom) {
            this.selectedPlace = undefined;
        }
    }

    async saveLocation() {
        this.saving = true;
        const latLng = this.newPlaceMarker.getPosition();
        const location = await this.getAddress(latLng.lat(), latLng.lng());
        const place: Place = {
            latitude: latLng.lat(),
            longitude: latLng.lng(),
            location: {
                addressLine: location.addressLine,
                postalCode: location.postalCode,
                city: location.city,
                state: location.state,
                country: location.country,
                acronym: location.acronym
            }
        };
        this.placesService.save(place)
            .then(async (success: any) => {
                if (success.passed === true) {
                    await this.toast.messageSuccessAboveButton('Ubicación guardada exitosamente');
                    this.placeToSave = success.response;
                    this.beforeSaveLocation = false;
                    this.saving = false;
                } else {
                    this.saving = false;
                    if (success.code === 31) {
                        await this.toast.messageErrorAboveButton('Ha excedido el numero de registros por este dia.');
                    } else {
                        await this.toast.messageErrorAboveButton('No se ha guardar la ubicacion. Intente de nuevo!');
                    }
                }
            }, reason => {
                this.saving = false;
                this.toast.messageErrorAboveButton('No se ha guardar la ubicacion por problemas internos. Intente mas tarde!');
            });
    }

    getAddress(lat: number, lng: number): Promise<any> {
        return new Promise(resolve => {
            this.placesService.getPlaceByGeocode(lat, lng)
                .then(response => {
                    const address = response.results;
                    const infoPlace = address[0].address_components;
                    resolve({
                        addressLine: address[0].formatted_address,
                        postalCode: infoPlace.slice(-1)[0].long_name,
                        city: infoPlace.slice(-5)[0].long_name,
                        state: infoPlace.slice(-3)[0].long_name,
                        country: infoPlace.slice(-2)[0].long_name,
                        acronym: infoPlace.slice(-2)[0].short_name,
                    });
                });
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

    onPlaceTypeChanged(selected: string) {
        this.placeTypeSelected = selected;
        this.selectedPlace = undefined;
        if (this.mapReady && !this.searching) {
            this.getNearPlaces();
        }
    }

    onSearch(event) {
        this.searchText = event.target.value.toLowerCase();
    }

    async saveNewLocation() {
        this.saving = true;
        const latLng = this.editPlaceMarker.getPosition();
        const location = await this.getAddress(latLng.lat(), latLng.lng());
        const newPlaceLocation: Place = {
            id: this.intentProvider.placeToChangeLocation.id,
            latitude: latLng.lat(),
            longitude: latLng.lng(),
            location: {
                address: this.intentProvider.placeToChangeLocation.location.address,
                addressLine: location.addressLine,
                postalCode: location.postalCode,
                city: location.city,
                state: location.state,
                country: location.country,
                acronym: location.acronym
            }
        };
        this.placesService.changeLocation(newPlaceLocation)
            .then((success: any) => {
                if (success.passed === true) {
                    this.toast.messageSuccessWithoutTabs('Ubicación actualizada exitosamente', 3000, 'success');
                    this.saving = false;
                    this.storageService.setBusinessVerifiedByUser(success.response.place).then(() => {
                        this.isRegistering = false;
                        this.isEditingBusiness = false;
                        this.isSearching = false;
                        this.isFindMyBusiness = false;
                        this.router.navigate(['/app/tabs/my-business']).then(() => {
                            this.getNearPlaces();
                        });
                    });
                } else {
                    this.saving = false;
                    this.toast.messageErrorAboveButton('No se ha guardar la ubicacion. Intente de nuevo!');
                }
            }, reason => {
                this.saving = false;
                this.toast.messageErrorAboveButton('No se ha guardar la ubicacion por problemas de conexion. Intente mas tarde!');
            });
    }
}
