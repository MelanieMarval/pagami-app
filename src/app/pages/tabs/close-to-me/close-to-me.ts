import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapPage } from '../../parent/MapPage';
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

    @ViewChild('fab', { static: false, read: ElementRef }) private ionFab: ElementRef;

    fabAttached = true;

    selectedCategory = 0;
    bottomDrawer = {
        shouldBounce: true,
        disableDrag: false,
        distanceTop: 58,
        dockedHeight: 550,
        minimumHeight: 118,
        drawerState: DrawerState.Bottom,
        contentPosition: 0,
        hidden: false
    };
    bottomHeightChange: EventEmitter<number> = new EventEmitter<number>();

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
}
