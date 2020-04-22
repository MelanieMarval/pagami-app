import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// Services
import { PlacesService } from '../../../../core/api/places/places.service';
import { ClaimService } from '../../../../core/api/claim/claim.service';
import { Claim } from '../../../../core/api/claim/claim';
// Providers
import { IntentProvider } from '../../../../providers/intent.provider';
import { ToastProvider } from '../../../../providers/toast.provider';
// Utils
import { CLAIMS, PLACES } from '../../../../utils/Const';

@Component({
    selector: 'app-admin-claim-details',
    templateUrl: 'claim-details.html',
    styleUrls: ['claim-details.scss']
})
export class ClaimDetailsPage implements OnInit {

    STATUS = PLACES.STATUS;
    claim: Claim;
    saving = false;
    saved = false;
    rejecting = false;
    rejectReason = '';
    isAccepting: boolean;

    constructor(private intentProvider: IntentProvider,
                private placeService: PlacesService,
                private claimService: ClaimService,
                private toast: ToastProvider,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertController) {
    }

    ngOnInit() {
        if (this.intentProvider.claimToVerified) {
            this.isAccepting = false;
            this.rejectReason = '';
            this.claim = this.intentProvider.claimToVerified;
        }
        console.log(this.claim);
    }

    verifyClaim() {
        this.saving = true;
        this.claimService.changeStatus(this.claim.id, CLAIMS.STATUS.ACCEPTED)
            .then(success => {
                this.saving = false;
                if (success.passed) {
                    this.saved = true;
                    this.intentProvider.claimToVerified = undefined;
                    this.intentProvider.returnClaimToVerified = success.response;
                    this.toast.messageSuccessWithoutTabs('Verificacion exitosa');
                } else {
                    this.toast.messageErrorAboveButton('Verificacion Fallida. Intente nuevamente!');
                }
            })
            .catch(error => {
                console.log(error);
                this.saving = false;
                this.toast.messageErrorAboveButton('Verificacion Fallida. Intente nuevamente!');
            });
    }

    async openConfirm() {
        const alert = await this.alert.create({
            header: 'Rechazo de Empresa',
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
                        this.rejectClaim();
                    }
                }
            ]
        });
        await alert.present();
    }

    rejectClaim() {
        this.rejecting = true;
        this.claimService.changeStatus(this.claim.id, CLAIMS.STATUS.REJECTED)
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
