import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {RecordDetailsRoutingModule} from './record-details-routing.module';
import { RecordDetailsPage } from './record-details';
import { PipesModule } from '../../../../pipes/pipes.module';



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        RecordDetailsRoutingModule,
        PipesModule
    ],
    declarations: [
        RecordDetailsPage,
    ]
})
export class RecordDetailsModule {
}
