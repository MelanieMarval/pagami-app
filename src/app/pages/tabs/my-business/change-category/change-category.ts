import { Component, OnInit } from '@angular/core';
import { CATEGORY_ICONS } from '../../../../utils/category.icons';
import { StorageProvider } from '../../../../providers/storage.provider';
import { Place } from '../../../../core/api/places/place';
import { PlacesService } from '../../../../core/api/places/places.service';
import { ToastProvider } from '../../../../providers/toast.provider';
import { Router } from '@angular/router';
import { PLACES } from '../../../../utils/Const';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';

@Component({
    selector: 'page-change-category',
    templateUrl: 'change-category.html',
    styleUrls: ['./change-category.scss'],
})

export class ChangeCategoryPage implements OnInit {

    loading = false;
    type = PLACES.TYPE;
    place: Place = {latitude: 0, longitude: 0};
    listIcons: any[] = [];
    selectedIcon: string;

    constructor(private storage: StorageProvider,
                private toast: ToastProvider,
                private placesService: PlacesService,
                private intentProvider: UserIntentProvider,
                private router: Router) {

    }

    async ngOnInit() {
        for (const icon of CATEGORY_ICONS) {
            if (icon.subCategory !== PLACES.CATEGORY.PAGAMI) {
                this.listIcons.push(icon);
            }
        }
        this.place = await this.storage.getBusinessVerifiedByUser();
        const currency = this.place.category ? this.listIcons.findIndex(icon => icon.route === this.place.category.icon) : 0;
        this.selectedIcon = String(currency) + this.place.category;
        if (currency === 0) {
            this.place.category = {
                name: this.listIcons[0].name,
                icon: this.listIcons[0].route,
                subCategory: this.listIcons[0].subCategory
            };
        }
    }

    selectIcon(index, icon, type: string) {
        this.selectedIcon = String(index) + type;
        this.place.category = {
            name: icon.name,
            icon: icon.route,
            subCategory: icon.subCategory
        };
        this.place.type = icon.type;
    }

    saveCategory() {
        this.loading = true;
        this.placesService.update(this.place)
            .then(async success => {
                if (success.passed === true) {
                    await this.storage.setBusinessVerifiedByUser(this.place);
                    this.loading = false;
                    this.toast.messageSuccessWithoutTabs('Su empresa ha sido actualizada exitosamente!');
                    this.router.navigateByUrl('app/tabs/my-business');
                    this.intentProvider.updateMyBusiness = true;
                } else {
                    this.loading = false;
                    this.toast.messageErrorWithoutTabs('Puede que este experimentando problemas de conexión. Intente de nuevo!');
                }
            }).catch(error => {
            this.loading = false;
            this.toast.messageErrorWithoutTabs('Estamos teniendo problemas al procesar su solicitud. Intente mas tarde');
        });
    }
}
