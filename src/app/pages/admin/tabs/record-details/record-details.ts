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
import { BrowserProvider } from '../../../../providers/browser.provider';

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
    browser = this.browserProvider;
    deleteing = false;

    constructor(private intentProvider: AdminIntentProvider,
                private placeService: PlacesService,
                private claimService: ClaimService,
                private toast: ToastProvider,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertController,
                private browserProvider: BrowserProvider) {
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
                    this.toast.messageSuccessWithoutTabs('La empresa ha sido aceptada con exito');
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

    rejectPlace() {
        this.rejecting = true;
        this.placeService.changeStatus(this.place.id, this.STATUS.REJECTED, this.rejectReason)
            .then(success => {
                this.rejecting = false;
                if (success.passed) {
                    this.saved = true;
                    this.intentProvider.placeToAccept = undefined;
                    this.intentProvider.returnPlaceToAccept = success.response;
                    this.toast.messageSuccessWithoutTabs('Esta empresa ha sido rechazada exitosamente');
                } else {
                    this.toast.messageErrorAboveButton('No se ha rechazar la empresa. Intente nuevamente!');
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

    async deleteBusinessConfirm() {
        const alert = await this.alert.create({
            header: 'Eliminación de empresa',
            message: 'Si eliminas esta empresa toda su información asociada se perderá y no podrás recuperla',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Eliminar de todas formas',
                    cssClass: 'alert-confirm',
                    handler: () => {
                        this.deleteing = true;
                        this.placeService.deleteFull(this.place.id)
                            .then(success => {
                                if (success.passed) {
                                    this.toast.messageSuccessWithoutTabs('La empresa ha sido eliminada con exito.', 3500);
                                    this.intentProvider.placeToViewDeleted = this.place;
                                    this.router.navigateByUrl('/admin/tabs/businesses');
                                } else {
                                    this.toast.messageErrorWithoutTabs('El proceso no pudo completarse');
                                }
                                this.deleteing = false;
                            }).catch(() => {
                                this.toast.messageErrorWithoutTabs('El proceso no pudo completarse');
                                this.deleteing = false;
                            });
                    }
                }
            ],
            cssClass: 'ion-color-pagami-surface'
        });

        await alert.present();
    }
}
