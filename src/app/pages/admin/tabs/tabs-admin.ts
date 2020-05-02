import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../core/api/api.response';
import { PlacesService } from '../../../core/api/places/places.service';

@Component({
    selector: 'app-tabs-admin',
    templateUrl: 'tabs-admin.html',
    styleUrls: ['tabs-admin.scss']
})
// tslint:disable-next-line:component-class-suffix
export class TabsAdmin implements OnInit, AfterViewInit {

    showNotification = false;

    constructor(private placesService: PlacesService) {
    }

    ngOnInit() { }

    ngAfterViewInit() {
        this.placesService.getAllWaiting()
            .then((success: ApiResponse) => {
                if (success.passed) {
                    this.showNotification = success.response.length !== 0;
                }
            });
    }
}
