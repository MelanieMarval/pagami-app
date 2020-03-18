import { Component, OnInit } from '@angular/core';
import { DrawerState } from 'ion-bottom-drawer';

@Component({
    selector: 'app-nearby',
    templateUrl: 'nearby.html',
    styleUrls: ['nearby.scss']
})

export class NearbyPage implements OnInit {

    selectedCategory = 0;
    heightScreen: number;
    heightDrawer: any;

    shouldBounce = true;
    disableDrag = false;
    distanceTop = 58;
    dockedHeight = 564;
    minimumHeight = 118;
    drawerState = DrawerState.Bottom;
    states = DrawerState;

    constructor() {
    }

    ngOnInit() {
        this.heightScreen = window.innerHeight;
        this.heightScreen = this.heightScreen - 58;
    }

}
