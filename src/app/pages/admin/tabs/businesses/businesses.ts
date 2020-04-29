import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { PlacesService } from '../../../../core/api/places/places.service';
import { ApiResponse } from '../../../../core/api/api.response';
import { Place, PlaceStats } from '../../../../core/api/places/place';

// Providers
import { ToastProvider } from '../../../../providers/toast.provider';
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';
// Utils
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';

@Component({
    selector: 'app-admin-businesses',
    templateUrl: 'businesses.html',
    styleUrls: ['businesses.scss']
})
export class BusinessesPage implements OnInit, AfterViewChecked {

    loading = true;
    reloading = false;
    error = false;
    empty = false;
    registers: Place[];
    stats: PlaceStats;
    STATUS = PLACES.STATUS;
    indexOfPlaceToEdit: number = undefined;
    placeThumbnailPhoto = PlaceUtils.getThumbnailPhoto;
    placeSortData = PlaceUtils.getSortData;

    constructor(private placesService: PlacesService,
                private router: Router,
                private toast: ToastProvider,
                private intentProvider: AdminIntentProvider) {
    }

    ngOnInit(): void {
        this.load();
    }

    ngAfterViewChecked(): void {
        if (this.intentProvider.needToUpdate) {
            this.intentProvider.needToUpdate = false;
            this.reload();
        }
    }

    async load() {
        this.loading = true;
        await this.getStats();
        await this.getRegisters();
    }

    async reload() {
        this.reloading = true;
        await this.getStats();
        await this.getRegisters();
    }

    async getRegisters() {
        await this.placesService.getAllAvailable()
            .then(async (success: ApiResponse) => {
                if (success.passed) {
                    this.registers = await success.response;
                    this.empty = this.registers.length === 0;
                    this.error = false;
                } else {
                    this.error = true;
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 3000);
                }
                this.loading = false;
                this.reloading = false;
            });
    }

    async getStats() {
        await this.placesService.getTotalPlaces()
            .then((success: ApiResponse) => {
                if (success.passed) {
                    this.stats = success.response;
                }
            });
    }

    verifyItemUpdated() {
        if (this.intentProvider.placeEdited && Number(this.indexOfPlaceToEdit)) {
            this.registers[this.indexOfPlaceToEdit] = this.intentProvider.placeEdited;
            this.intentProvider.placeEdited = undefined;
            this.indexOfPlaceToEdit = undefined;
        }
    }

    goToDetails(register: Place): void {
        this.intentProvider.placeToView = register;
        this.router.navigate(['admin/tabs/records/claim/details']);
    }

}
