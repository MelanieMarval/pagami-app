import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Modules
import { PipesModule } from '../../../../pipes/pipes.module';
import { BackgroundEmptyModule } from '../../../../shared/background-empty/background-empty.module';
import { SkeletonRecordsModule } from '../../../../shared/skeleton-records/skeleton-records.module';
// Pages
import { ClaimDetailsPage } from '../claim-details/claim-details';
import { RecordsPage } from './records';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild([
            {path: '', component: RecordsPage},
            {path: 'details', loadChildren: () => import('../record-details/record-details.module').then(m => m.RecordDetailsModule)},
            {path: 'claim', component: ClaimDetailsPage}
        ]),
        PipesModule,
        BackgroundEmptyModule,
        SkeletonRecordsModule,
    ],
    declarations: [
        RecordsPage,
        ClaimDetailsPage
    ]
})
export class RecordsModule {
}
