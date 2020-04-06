import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapPage } from '../../parent/MapPage';
import { DOCUMENT } from '@angular/common';
import { DrawerState } from '../../../modules/ion-bottom-drawer/drawer-state';
import { AppService } from '../../../services/app.service';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { PagamiGeo } from '../../../core/geolocation/pagami.geo';
import { Place } from '../../../core/api/places/place';
import { PlacesService } from '../../../core/api/places/places.service';
import { PagamiToast } from '../../../toast/pagami.toast';
import { StorageService } from '../../../core/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../core/api/api.response';
import { StorageInstance } from '../../../providers/storage.instance';

@Component({
    selector: 'app-close-to-me',
    templateUrl: 'close-to-me.html',
    styleUrls: ['close-to-me.scss']
})
export class CloseToMePage extends MapPage implements OnInit, AfterViewInit {

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
    modeRegister = false;
    beforeSaveLocation = true;
    saving = false;
    placeToSave: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private storageService: StorageService,
        private toast: PagamiToast,
        private placesService: PlacesService,
        private renderer: Renderer2,
        private appService: AppService,
        private storageInstance: StorageInstance,
        @Inject(DOCUMENT) doc: Document,
        protected geolocationService: GeolocationService) {
        super(doc, geolocationService);
    }

    ngOnInit() {
        this.appService.showNearby.subscribe(() => {
            this.modeRegister = false;
            if (this.bottomDrawer.drawerState === DrawerState.Bottom
                || this.bottomDrawer.drawerState === DrawerState.Top) {
                this.bottomHeightChange.emit(108);
                this.renderer.setStyle(this.ionFab.nativeElement, 'transition', '0.25s ease-in-out');
                this.renderer.setStyle(this.ionFab.nativeElement, 'transform', 'translateY(' + '-56px' + ')');
            }
        });
        this.appService.showRegister.subscribe(() => {
            this.modeRegister = true;
            this.onBottomSheetHide(true);
            this.bottomHeightChange.emit(0);
            this.beforeSaveLocation = true;
            this.placeToSave = undefined;
            this.map.panTo(this.currentPositionMarker.getPosition());
            this.map.setZoom(20);
        });
        this.placesService.getNearby().then((success: ApiResponse) => {
            if (success.passed) {
                this.setupPlaces(success.response);
            }
        });
    }

    onClickPlace(place: Place) {
        console.log(place);
        this.bottomDrawer.drawerState = DrawerState.Docked;
    }

    onCurrentPositionChanged(coors: PagamiGeo) {
        if (this.fabAttached || this.modeRegister) {
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

    onDrawerPositionChange(position: number) {
        if (this.bottomDrawer.showBackToolbar === false && this.bottomDrawer.distanceTop === position) {
            // console.log('drawer esta en el top');
        }
        if (this.bottomDrawer.showBackToolbar === true && this.bottomDrawer.distanceTop !== position) {
            // console.log('drawer quitado del top');
        }
        this.bottomDrawer.showBackToolbar = this.bottomDrawer.distanceTop === position;
        // console.log(position);
    }

    onScrollContent(position: number) {
        if (position === 0 && this.bottomDrawer.contentPosition !== 0) {
            // console.log('contenido scroleado a 0');
        }
        if (position !== 0 && this.bottomDrawer.contentPosition === 0) {
            // console.log('contenido quitado de la posicion 0');
        }
        this.bottomDrawer.contentPosition = position;
    }

    onDrawerStateChange($event: DrawerState) {
        this.bottomDrawer.drawerState = $event;
        // console.log('New Drawer state: ' + $event);
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
        // console.log(this.activatedRoute);
        // await this.router.navigate(['/app/business-details'], {
        //     relativeTo: this.activatedRoute,
        //     // replaceUrl: false,
        //     // skipLocationChange: true,
        //     // preserveFragment: false
        // });
        // console.log('entre al metodo');
        this.beforeSaveLocation = true;
        this.placeToSave = undefined;
        this.saving = false;
    }
}
