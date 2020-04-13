import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecordsPage } from './records';
import { PipesModule } from '../../../../pipes/pipes.module';
import { RecordDetailsModule } from '../record-details/record-details.module';
import { BackgroundEmptyModule } from '../../../../shared/background-empty/background-empty.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: RecordsPage},
            {path: 'details', loadChildren: () => import('../record-details/record-details.module').then(m => m.RecordDetailsModule)}
        ]),
        PipesModule,
        BackgroundEmptyModule,
    ],
    declarations: [ RecordsPage ]
})
export class RecordsModule {
}
