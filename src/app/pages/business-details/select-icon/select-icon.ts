import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Place } from '../../../core/api/places/place';
import { PlacesService } from '../../../core/api/places/places.service';

// Providers
import { StorageProvider } from '../../../providers/storage.provider';
import { ToastProvider } from '../../../providers/toast.provider';
import { IntentProvider } from '../../../providers/intent.provider';
import { CATEGORY_ICONS } from '../../../utils/category.icons';

@Component({
    selector: 'app-select-icon',
    templateUrl: 'select-icon.html',
    styleUrls: ['select-icon.scss']
})
export class SelectIconPage implements OnInit {

    selectedIcon: number;
    categoryIcons = CATEGORY_ICONS;
    place: Place = {latitude: 0, longitude: 0};
    saving: boolean;

    constructor(
        public toast: ToastProvider,
        private route: Router,
        private http: HttpClient,
        private storageService: StorageProvider,
        private storageInstance: IntentProvider,
        private placesService: PlacesService,
    ) {
    }

    async ngOnInit() {
        this.place = this.storageInstance.placeToEdit;
        this.selectedIcon = this.place.icon ? this.categoryIcons.findIndex(icon => icon.name === this.place.icon) : 0;
        this.place.icon = this.place.icon ? this.place.icon : this.categoryIcons[0].name;
    }

    async selectIcon(index, name) {
        this.selectedIcon = index;
        this.place.icon = name;
        this.storageInstance.placeToEdit = this.place;
    }

    saveIconBusiness() {
        this.saving = true;
        if (this.place.icon) {
            this.placesService.update(this.place)
                .then(async success => {
                    if (success.passed) {
                        this.storageInstance.placeEdited = success.response;
                        this.saving = false;
                        await this.toast.messageSuccessWithoutTabs('Empresa registrada con exito!');
                        await this.route.navigate(['/app/tabs/wallet/activity']);
                    } else {
                        this.saving = false;
                        await this.toast.messageErrorWithoutTabs('No se ha guardar su informacion. Intente de nuevo!');
                    }
                });
        } else {
            this.toast.messageErrorWithoutTabs('Seleccione un icono para representar su empresa');
            this.saving = false;
        }
    }

}
