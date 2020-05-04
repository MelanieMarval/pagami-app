import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// Services
import { PlacesService } from '../../../../core/api/places/places.service';
import { ClaimService } from '../../../../core/api/claim/claim.service';
import { Claim } from '../../../../core/api/claim/claim';
// Providers
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';
import { ToastProvider } from '../../../../providers/toast.provider';
// Utils
import { CLAIMS, PLACES } from '../../../../utils/Const';
import { UsersService } from '../../../../core/api/users/users.service';

@Component({
    selector: 'app-admin-claim-details',
    templateUrl: 'claim-details.html',
    styleUrls: ['claim-details.scss']
})
export class ClaimDetailsPage implements OnInit, AfterViewChecked {

    STATUS = PLACES.STATUS;
    claim: Claim;
    saving = false;
    saved = false;
    rejecting = false;
    rejectReason = '';
    isAccepting: boolean;

    constructor(private intentProvider: AdminIntentProvider,
                private placeService: PlacesService,
                private claimService: ClaimService,
                private usersService: UsersService,
                private toast: ToastProvider,
                private router: Router,
                private route: ActivatedRoute,
                private alert: AlertController) {
    }

    ngOnInit() {
        this.isAccepting = false;
        this.claim = this.intentProvider.claimToVerified;
        this.viewUser();
        this.viewPlace();
    }

    ngAfterViewChecked(): void {
        // this.viewUser();
        // this.viewPlace();
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
                    this.toast.messageSuccessWithoutTabs('La empresa ha sido verificada con exito');
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
                    this.intentProvider.claimToVerified = undefined;
                    this.intentProvider.returnClaimToVerified = success.response;
                    this.toast.messageSuccessWithoutTabs('Esta empresa ha sido rechazada exitosamente');
                } else {
                    this.toast.messageErrorAboveButton('No se ha rechazar la empresa. Intente nuevamente!');
                }
            });
    }

    viewUser() {
        this.usersService.findById(this.claim.userId)
            .then(success => {
                if (success.passed) {
                    this.intentProvider.userToView = success.response;
                } else {
                    this.toast.messageErrorAboveButton('Hemos tenido problemas compruebe su conexion a internet');
                }
            }).catch(error => {
            this.toast.messageErrorAboveButton('Hemos tenido problemas compruebe su conexion a internet');
        });
    }

    viewPlace() {
        this.placeService.findById(this.claim.placeId)
            .then(success => {
                if (success.passed) {
                    this.intentProvider.placeToView = success.response;
                } else {
                    this.toast.messageErrorAboveButton('Hemos tenido problemas compruebe su conexion a internet');
                }
            }).catch(error => {
            this.toast.messageErrorAboveButton('Hemos tenido problemas compruebe su conexion a internet');
        });
    }

    goToUserDetails() {
        this.router.navigate(['/admin/tabs/records/claim/profile']);
    }

    goToPlaceDetails() {
        this.router.navigate(['/admin/tabs/records/details']);
    }
}
