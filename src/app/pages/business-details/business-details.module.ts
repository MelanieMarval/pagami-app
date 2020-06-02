import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessDetailsPage } from './business-details';
import { SelectIconPage } from './select-icon/select-icon';
import { ImageTooltipsModule } from '../../shared/image-tooltips/image-tooltips.module';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
    {
        path: '', component: BusinessDetailsPage
    },
    {
        path: 'select-icon', component: SelectIconPage
    }
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ImageTooltipsModule,
        PipesModule
    ],
    declarations: [BusinessDetailsPage, SelectIconPage]
})

export class BusinessDetailsModule {
}
