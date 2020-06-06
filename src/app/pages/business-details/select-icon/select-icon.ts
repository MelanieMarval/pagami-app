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

    selectedIcon: string;
    listIcons: any[] = [];
    type = PLACES.TYPE;
    place: Place = {latitude: 0, longitude: 0};
    saving: boolean;

    constructor(
        public toast: ToastProvider,
        private router: Router,
        private http: HttpClient,
        private storageService: StorageProvider,
        private storageInstance: UserIntentProvider,
        private placesService: PlacesService
    ) {
    }

    ngOnInit() {
        this.place = this.storageInstance.placeToEdit;
        for (const icon of CATEGORY_ICONS) {
            if (icon.subCategory !== PLACES.CATEGORY.PAGAMI) {
                this.listIcons.push(icon);
            }
        }
        this.setCurrentCategory();
    }

    setCurrentCategory() {
        const arrayToSearch = this.place.category ? this.listIcons.filter(icon => icon.type === this.place.type) : 0;
        if (arrayToSearch === 0) {
            this.place.category = {
                name: this.listIcons[0].name,
                icon: this.listIcons[0].route,
                subCategory: this.listIcons[0].subCategory
            };
            this.selectedIcon = '0' + this.type.STORE;
        } else {
            const current = arrayToSearch.findIndex(icon => icon.route === this.place.category.icon);
            this.selectedIcon = String(current) + this.place.type;
        }
        console.log('-> this.selectedIcon', this.selectedIcon);
    }

    selectIcon(index, icon, type: string) {
        this.selectedIcon = String(index) + type;
        console.log('-> this.selectedIcon', this.selectedIcon);
        this.place.category = {
            name: icon.name,
            icon: icon.route,
            subCategory: icon.subCategory
        };
        this.place.type = icon.type;
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
                        this.router.navigate(['/app/tabs/wallet/activity']);
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
