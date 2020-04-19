import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'page-business-claim',
    templateUrl: 'business-claim.html',
    styleUrls: ['./business-claim.scss'],
})

export class BusinessClaimPage implements OnInit {

    form: FormGroup;
    loading: false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            rif: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            phone: new FormControl('', [Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern('^(\\+[1-9][0-9]*(\\([0-9]*\\)|-[0-9]*-))?[0]?[1-9][0-9\\- ]*$')]),
            email: new FormControl('', [Validators.required,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
            notes: new FormControl('', [Validators.minLength(5), Validators.maxLength(300)])
        });
    }

    saveData() {
        console.log(this.form);
        this.router.navigate(['/app/business-claim/plans']);
    }

    event() {
        console.log(this.form.get('phone'));
    }
}
