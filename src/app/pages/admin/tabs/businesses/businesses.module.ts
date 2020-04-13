import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BusinessesPage } from './businesses';
import { PipesModule } from '../../../../pipes/pipes.module';
import { BackgroundEmptyModule } from '../../../../shared/background-empty/background-empty.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '', component: BusinessesPage
        }]),
        PipesModule,
        BackgroundEmptyModule
    ],
    declarations: [ BusinessesPage ]
})
export class BusinessesModule {
}
