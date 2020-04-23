import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { Place } from '../../../../core/api/places/place';
import { ClaimService } from '../../../../core/api/claim/claim.service';
import { PlacesService } from '../../../../core/api/places/places.service';
// Providers
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';
import { ToastProvider } from '../../../../providers/toast.provider';
import { PLACES } from '../../../../utils/Const';
import { PlaceUtils } from '../../../../utils/place.utils';

@Component({
    selector: 'app-admin-record-details',
    templateUrl: 'record-details.html',
    styleUrls: ['record-details.scss']
})

export class RecordDetailsPage implements OnInit {

    STATUS = PLACES.STATUS;
    isView: boolean;
    place: Place = {latitude: 0, longitude: 0};
    placeTypeSpanish = PlaceUtils.getTypeSpanish;
    saving = false;
    saved = false;
    rejecting = false;
    rejectReason = '';

    constructor(private intentProvider: AdminIntentProvider,
                private placeService: PlacesService,
                private claimService: ClaimService,
                private toast: ToastProvider,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertController) {
    }

    ngOnInit() {
        if (this.intentProvider.placeToView) {
            this.isView = true;
            this.place = this.intentProvider.placeToView;
            return;
        }
        if (this.intentProvider.placeToAccept) {
            this.isView = false;
            this.place = this.intentProvider.placeToAccept;
        }
        console.log(this.place);
    }

    acceptPlace() {
        this.saving = true;
        this.placeService.changeStatus(this.place.id, this.STATUS.ACCEPTED)
            .then(success => {
                this.saving = false;
                if (success.passed) {
                    this.saved = true;
                    this.intentProvider.placeToAccept = undefined;
                    this.intentProvider.returnPlaceToAccept = success.response;
                    this.toast.messageSuccessWithoutTabs('Aceptacion exitosa');
                } else {
                    this.toast.messageErrorAboveButton('Aceptacion Fallida. Intente nuevamente!');
                }
            })
            .catch(error => {
                console.log(error);
                this.saving = false;
                this.toast.messageErrorAboveButton('Aceptacion Fallida. Intente nuevamente!');
            });
    }

    async openConfirm() {
        const alert = await this.alert.create({
            header: 'Rechazo de Empresa',
            inputs: [
                {
                    name: 'reason',
                    id: 'reason',
                    type: 'textarea',
                    placeholder: 'Razon del rechazo',
                    value: this.rejectReason
                }
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
                    text: 'Enviar',
                    handler: (data) => {
                        this.rejectReason = data.reason;
                        this.rejectPlace();
                    }
                }
            ]
        });
        await alert.present();
    }

    rejectPlace() {
        this.rejecting = true;
        this.placeService.changeStatus(this.place.id, this.STATUS.REJECTED, this.rejectReason)
            .then(success => {
                this.rejecting = false;
                if (success.passed) {
                    this.saved = true;
                    this.intentProvider.placeToAccept = undefined;
                    this.intentProvider.returnPlaceToAccept = success.response;
                    this.toast.messageSuccessWithoutTabs('Mensaje enviado exitosamente');
                } else {
                    this.toast.messageErrorAboveButton('No se ha podido enviar su mensaje. Intente nuevamente!');
                }
            });

    }

}
