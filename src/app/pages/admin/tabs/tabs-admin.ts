import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../core/api/api.response';
import { PlacesService } from '../../../core/api/places/places.service';
// Providers
import { IntentProvider } from '../../../providers/intent.provider';
import { ToastProvider } from '../../../providers/toast.provider';

@Component({
    selector: 'app-tabs-admin',
    templateUrl: 'tabs-admin.html',
    styleUrls: ['tabs-admin.scss']
})
// tslint:disable-next-line:component-class-suffix
export class TabsAdmin implements OnInit {


    constructor(private placesService: PlacesService,
                private intentProvider: IntentProvider,
                private toast: ToastProvider) {
    }

    async ngOnInit() {
        await this.placesService.getAllWaiting()
            .then((success: ApiResponse) => {
                if (success.passed) {
                    this.intentProvider.showNotification = success.response.length !== 0;
                } else {
                    this.toast.messageErrorAboveButton('Compruebe su conexion a internet', 5000);
                }
            });
    }

}
