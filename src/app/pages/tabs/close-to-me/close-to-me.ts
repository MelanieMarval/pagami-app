import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MapPage} from '../../parent/MapPage';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-close-to-me',
    templateUrl: 'close-to-me.html',
    styleUrls: ['close-to-me.scss']
})
export class CloseToMePage extends MapPage implements OnInit, AfterViewInit {

    fabAttached = true;
    
    constructor(
        geolocation: Geolocation,
        @Inject(DOCUMENT) doc: Document) {
        super(geolocation, doc);
    }

    ngOnInit() { }

    async ngAfterViewInit() {
        this.loadMap(true);
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

}
