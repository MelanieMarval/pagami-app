import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { PlacesService } from '../../../../core/api/places/places.service';
import { ApiResponse } from '../../../../core/api/api.response';
import { Place } from '../../../../core/api/places/place';

// Providers
import { ToastProvider } from '../../../../providers/toast.provider';
import { StorageProvider } from '../../../../providers/storage.provider';
import { IntentProvider } from '../../../../providers/intent.provider';
// Utils
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';

@Component({
    selector: 'app-admin-businesses',
    templateUrl: 'businesses.html',
    styleUrls: ['businesses.scss']
})
export class BusinessesPage implements OnInit {

    loading = true;
    error = false;
    registers: Place[];
    STATUS = PLACES.STATUS;
    indexOfPlaceToEdit: number = undefined;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;

    constructor(private placesService: PlacesService,
                private storageService: StorageProvider,
                private router: Router,
                private toast: ToastProvider,
                private storageInstance: IntentProvider) {
    }

    ngOnInit() {
        this.router.events.subscribe(next => {
            if (next instanceof ResolveEnd) {
                this.verifyItemUpdated();
            }
        });
        this.placesService.getAllAvailable()
            .then(async (success: ApiResponse) => {
                this.loading = false;
                if (success.passed) {
                    this.registers = await success.response;
                    this.error = false;
                } else {
                    this.error = true;
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 3000);
                }
            });
    }

    verifyItemUpdated() {
        if (this.storageInstance.placeEdited && Number(this.indexOfPlaceToEdit)) {
            this.registers[this.indexOfPlaceToEdit] = this.storageInstance.placeEdited;
            this.storageInstance.placeEdited = undefined;
            this.indexOfPlaceToEdit = undefined;
        }
    }

    filterRegisters(status: string): number {
        let total;
        total = this.registers.filter(place => place.status === status);
        return total.length;
    }
}
