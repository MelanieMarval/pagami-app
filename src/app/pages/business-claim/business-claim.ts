import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Claim } from '../../core/api/claim/claim';
import { IntentProvider } from '../../providers/intent.provider';

@Component({
    selector: 'page-business-claim',
    templateUrl: 'business-claim.html',
    styleUrls: ['./business-claim.scss'],
})

export class BusinessClaimPage implements OnInit {

    form: FormGroup;
    claim: Claim;
    loading: false;

    constructor(private router: Router,
                private intentProvider: IntentProvider) {
    }

    ngOnInit(): void {
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
        this.intentProvider.placeToClaim = undefined;
    }

    saveData() {
        this.claim = this.form.value;
        this.intentProvider.placeToClaim = this.claim;
        console.log(this.claim);
        this.router.navigate(['/app/business-claim/plans']);
    }
}
