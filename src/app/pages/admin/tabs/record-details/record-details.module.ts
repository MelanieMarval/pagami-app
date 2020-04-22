import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecordDetailsPage } from './record-details';
import { PipesModule } from '../../../../pipes/pipes.module';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        PipesModule,
        RouterModule.forChild([{
            path: '', component: RecordDetailsPage
        }]),
    ],
    declarations: [
        RecordDetailsPage,
    ]
})
export class RecordDetailsModule {
}
