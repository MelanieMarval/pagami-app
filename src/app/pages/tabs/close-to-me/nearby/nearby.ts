import { Component, OnInit } from '@angular/core';
import { DrawerState } from '../../../modules/ion-bottom-drawer/drawer-state';

@Component({
    selector: 'app-nearby',
    templateUrl: 'nearby.html',
    styleUrls: ['nearby.scss']
})

export class NearbyPage implements OnInit {

    selectedCategory = 0;
    heightScreen: number;

    shouldBounce = true;
    disableDrag = false;
    distanceTop = 58;
    dockedHeight = 550;
    minimumHeight = 118;
    drawerState = DrawerState.Bottom;

    constructor() {
    }

    ngOnInit() {
        this.heightScreen = window.innerHeight;
        this.heightScreen = this.heightScreen - 58;
    }

    enableDashScroll($event) {
        // console.log($event);
        // console.log('enable dash scroll');
        this.disableDrag = false;
    }

    disableDashScroll() {
        // console.log('disable dash scroll');
        this.disableDrag = false;
    }
}
