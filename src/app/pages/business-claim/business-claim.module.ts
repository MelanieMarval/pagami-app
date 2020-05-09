import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessClaimPage } from './business-claim';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: BusinessClaimPage}])
    ],
    declarations: [
        BusinessClaimPage
    ],
    providers: []
})
export class BusinessClaimModule {
}
