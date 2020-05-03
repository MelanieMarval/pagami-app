import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Place } from '../../../core/api/places/place';
import { PlacesService } from '../../../core/api/places/places.service';

// Providers
import { StorageProvider } from '../../../providers/storage.provider';
import { ToastProvider } from '../../../providers/toast.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { CATEGORY_ICONS } from '../../../utils/category.icons';
import { PLACES } from '../../../utils/Const';

@Component({
    selector: 'app-select-icon',
    templateUrl: 'select-icon.html',
    styleUrls: ['select-icon.scss']
})
export class SelectIconPage implements OnInit {

    selectedIcon: number;
    listIcons: any[] = [];
    place: Place = {latitude: 0, longitude: 0};
    saving: boolean;

    constructor(
        public toast: ToastProvider,
        private route: Router,
        private http: HttpClient,
        private storageService: StorageProvider,
        private storageInstance: UserIntentProvider,
        private placesService: PlacesService
    ) {
    }

    async ngOnInit() {
        this.place = this.storageInstance.placeToEdit;
        for (const icon of CATEGORY_ICONS) {
            if (icon.type === this.place.type) {
                if (icon.subCategory !== PLACES.CATEGORY.PAGAMI) {
                    this.listIcons.push(icon);
                }
            }
        }
        this.selectedIcon = this.place.category ? this.listIcons.findIndex(icon => icon.route === this.place.category.icon) : 0;
        if (this.selectedIcon === 0) {
            this.place.category = {
                name: this.listIcons[0].name,
                icon: this.listIcons[0].route,
                subCategory: this.listIcons[0].subCategory
            };
        }
    }

    async selectIcon(index, icon) {
        this.selectedIcon = index;
        this.place.category = {
            name: icon.name,
            icon: icon.route,
            subCategory: icon.subCategory
        };
        this.storageInstance.placeToEdit = this.place;
    }

    saveIconBusiness() {
        this.saving = true;
        if (this.place.category.icon) {
            this.placesService.update(this.place)
                .then(success => {
                    if (success.passed) {
                        this.storageInstance.placeEdited = success.response;
                        this.saving = false;
                        this.toast.messageSuccessWithoutTabs('Empresa registrada con exito!');
                        this.route.navigate(['/app/tabs/wallet/activity']);
                    } else {
                        this.saving = false;
                        this.toast.messageErrorWithoutTabs('No se ha guardar su informacion. Intente de nuevo!');
                    }
                });
        } else {
            this.toast.messageErrorWithoutTabs('Seleccione un icono para representar su empresa');
            this.saving = false;
        }
    }

}
