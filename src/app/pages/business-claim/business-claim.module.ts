import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessClaimRoutingModule } from './business-claim-routing.module';
import { BusinessClaimPage } from './business-claim';
import { PlansPage } from './plans/plans';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        BusinessClaimRoutingModule
    ],
    declarations: [
        BusinessClaimPage,
        PlansPage
    ],
    providers: []
})
export class BusinessClaimModule {
}
