import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
    selector: 'app-tabs-page',
    templateUrl: 'tabs-page.html',
    styleUrls: ['tabs-page.scss']
})
export class TabsPage {

    constructor(private appService: AppService) {

    }

    openNearby() {
        this.appService.showNearby.emit();
    }
}
