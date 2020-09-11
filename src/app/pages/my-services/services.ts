import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserIntentProvider } from '../../providers/user-intent.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { Router } from '@angular/router';
import { Service } from '../../core/api/services/service';
import { ServicesService } from '../../core/api/services/services.service';
import { Place } from '../../core/api/places/place';
import { StorageProvider } from '../../providers/storage.provider';

@Component({
    selector: 'app-products',
    templateUrl: 'services.html',
    styleUrls: ['services.scss']
})
export class ServicePage implements OnInit, AfterViewChecked {

    services: Service[] = [];
    loading = false;
    textSearch = '';
    myBusiness: Place = {latitude: 0, longitude: 0};

    constructor(private alertController: AlertController,
                private router: Router,
                private toast: ToastProvider,
                private intentProvider: UserIntentProvider,
                private storage: StorageProvider,
                private cdRef: ChangeDetectorRef,
                private servicesService: ServicesService) {
    }

    async ngOnInit() {
        this.loading = true;
        this.myBusiness = await this.storage.getBusinessVerifiedByUser();
        this.chargeProducts();
    }

    ngAfterViewChecked(): void {
        if (this.intentProvider.serviceEdited) {
            const idx = this.services.findIndex(service => service.id === this.intentProvider.serviceEdited.id);
            this.services[idx] = this.intentProvider.serviceEdited;
            this.intentProvider.serviceEdited = undefined;
        }
        if (this.intentProvider.serviceDeleted) {
            const idx = this.services.findIndex(service => service.id === this.intentProvider.serviceDeleted.id);
            this.services.splice(idx, 1);
            this.intentProvider.serviceDeleted = undefined;
        }
        if (this.intentProvider.reloadServices) {
            this.intentProvider.reloadServices = false;
            this.chargeProducts();
            this.cdRef.detectChanges();
        }
    }

    chargeProducts() {
        console.log('-> this.myBusiness', this.myBusiness);
        this.loading = true;
        this.servicesService.getByPlaceId(this.myBusiness.id)
            .then(success => {
                if (success.passed) {
                    this.services = success.response;
                    this.loading = false;
                } else {
                    this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
                    this.loading = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
            this.loading = false;
        });
    }


    openService(service: Service) {
        // this.intentProvider.serviceToEdit = Object.assign({}, service);
        // this.router.navigateByUrl('/app/my-services/service/edit');
    }

    validateCanAddService() {
        if (this.services.length >= this.myBusiness.plan.limitServices) {
            this.toast.messageErrorWithoutTabs(
                `Has excedido el limite de ${this.myBusiness.plan.limitServices} servicios permitidos por tu plan`);
            return;
        }
        this.router.navigateByUrl('/app/my-services/service/add');
    }

}
