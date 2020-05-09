import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Claim } from '../../core/api/claim/claim';
import { UserIntentProvider } from '../../providers/user-intent.provider';
import { ClaimService } from '../../core/api/claim/claim.service';
import { ToastProvider } from '../../providers/toast.provider';

@Component({
    selector: 'page-business-claim',
    templateUrl: 'business-claim.html',
    styleUrls: ['./business-claim.scss'],
})

export class BusinessClaimPage implements OnInit {

    form: FormGroup;
    claim: Claim;
    loading: false;
    saved: boolean;

    constructor(private router: Router,
                private intentProvider: UserIntentProvider,
                private toast: ToastProvider,
                private claimService: ClaimService) {
    }

    ngOnInit(): void {
        console.log(this.intentProvider.placeToClaim);
        this.form = new FormGroup({
            // @ts-ignore
            placeId: new FormControl(this.intentProvider.placeToClaim.id),
            businessRuc: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            businessPhone: new FormControl('', [Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern('^(\\+[1-9][0-9]*(\\([0-9]*\\)|-[0-9]*-))?[0]?[1-9][0-9\\- ]*$')]),
            businessEmail: new FormControl('', [Validators.required,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
            businessComment: new FormControl('', [Validators.minLength(5), Validators.maxLength(300)])
        });
    }

    saveData() {
        this.claim = this.form.value;

        this.claimService.claimBusiness(this.claim)
            .then(success => {
                this.loading = false;
                if (success.passed) {
                    this.saved = true;
                    this.intentProvider.placeToClaim = undefined;
                    this.toast.messageSuccessBottom('Gracias por tu solicitud. <br>La verificacion de tu empresa esta en camino!', 3000);
                } else {
                    this.toast.messageErrorWithoutTabs('Hay problemas de conexion. Intente de nuevo.');
                }
            });
    }
}
