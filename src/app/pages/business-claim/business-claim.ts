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
    loading = false;
    saved: boolean;
    st = 'njkdniudhiuHYHY';

    constructor(private router: Router,
                private intentProvider: UserIntentProvider,
                private toast: ToastProvider,
                private claimService: ClaimService) {
    }

    get data() {
        return this.form.controls;
    }

    ngOnInit() {
        this.form = new FormGroup({
            businessPhone: new FormControl('', [Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern('^\\+?[0-9]{1,3}[0-9]{4,14}(?:x.+)?$')]),
            businessEmail: new FormControl('', [Validators.required,
                Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')]),
            businessComment: new FormControl('', [Validators.minLength(5), Validators.maxLength(300)])
        });
    }

    saveData() {
        this.loading = true;
        const businessEmail = this.data.businessEmail.value.toLowerCase().trim();
        this.claim = {
            placeId: this.intentProvider.placeToClaim.id,
            businessPhone: this.data.businessPhone.value,
            businessEmail,
            businessComment: this.data.businessComment.value
        };
        this.claimService.claimBusiness(this.claim)
            .then(success => {
                this.loading = false;
                if (success.passed) {
                    this.saved = true;
                    this.intentProvider.placeToClaim = undefined;
                    this.toast.messageDefault('Gracias por tu solicitud. <br>La verificacion de tu empresa esta en camino!', 'middle', 3500);
                    this.router.navigateByUrl('/app/tabs/map/search');
                } else {
                    this.toast.messageErrorWithoutTabs('Hay problemas de conexion. Intente de nuevo.');
                }
            }).catch(error => {
                this.toast.messageErrorWithoutTabs('Estamos experimentando problemas. Intente mas tarde!');
            });
    }
}
