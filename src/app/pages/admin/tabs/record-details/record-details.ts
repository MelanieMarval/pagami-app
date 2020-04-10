import { Component, OnInit } from '@angular/core';
import { Place } from '../../../../core/api/places/place';
import { PLACES } from '../../../../utils/Const';
import { IntentProvider } from '../../../../providers/intent.provider';
import { PlaceUtils } from '../../../../utils/place.utils';
import { PlacesService } from '../../../../core/api/places/places.service';
import { ToastProvider } from '../../../../providers/toast.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
    selector: 'app-shop',
    templateUrl: 'record-details.html',
    styleUrls: ['record-details.scss']
})
export class RecordDetailsPage implements OnInit {

    STATUS = PLACES.STATUS;
    place: Place = {latitude: 0, longitude: 0};
    placeTypeSpanish = PlaceUtils.getTypeSpanish;
    saving = false;
    saved = false;
    rejecting = false;
    rejectReason = '';

    constructor(private intentProvider: IntentProvider,
                private placeService: PlacesService,
                private toast: ToastProvider,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertController) {
    }

    ngOnInit() {
        if (this.intentProvider.placeToAccept) {
            this.rejectReason = '';
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
                    this.toast.messageSuccessWithoutTabs('Verificacion exitosa');
                } else {
                    this.toast.messageErrorAboveButton('Verificacion Fallida. Intente nuevamente!');
                }
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