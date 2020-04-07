import { Component, Input, OnInit } from '@angular/core';
import { PlacesService } from '../../../../core/api/places/places.service';

@Component({
    selector: 'app-nearby',
    templateUrl: 'nearby.html',
    styleUrls: ['nearby.scss']
})

export class NearbyPage implements OnInit {

    @Input() drawerState = 0;
    selectedCategory = 0;

    constructor() {
    }

    ngOnInit() {
    }
}
