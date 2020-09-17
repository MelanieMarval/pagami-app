import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicesService } from '../../../core/api/services/services.service';
import { ToastProvider } from '../../../providers/toast.provider';
import { Service } from '../../../core/api/services/service';
import { AlertProvider } from '../../../providers/alert.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-services',
    templateUrl: 'services.html',
    styleUrls: ['services.scss']
})
export class ServicesPage implements OnInit {

    loading: boolean;
    services: Service[] = [];
    textSearch: string;
    title = '';

    constructor(private alertController: AlertController,
                private servicesService: ServicesService,
                private toast: ToastProvider,
                private route: ActivatedRoute,
                private alert: AlertProvider,
                private intentProvider: UserIntentProvider) {
    }

    ngOnInit() {
        this.title = this.intentProvider.placeToShow.name;
        const placeId = this.route.snapshot.params.id;
        this.chargeServices(placeId);
    }

    async selectService() {
        const alert = await this.alertController.create({
            header: 'Leche south 1 L!',
            inputs: [
                {
                    name: 'description',
                    id: 'paragraph',
                    type: 'textarea',
                    placeholder: 'Describe lo que necesitas'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Solicitar Servicio',
                    cssClass: 'pagami',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }

    chargeServices(placeId: string) {
        this.loading = true;
        this.servicesService.getByPlaceId(placeId)
            .then(success => {
                if (success.passed) {
                    this.services = success.response;
                    this.loading = false;
                } else {
                    this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
                    this.loading = false;
                }
            }, error => {
                this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
                this.loading = false;
            });
    }
}
