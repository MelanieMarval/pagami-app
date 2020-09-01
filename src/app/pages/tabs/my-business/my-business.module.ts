import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyBusinessPage } from './my-business';
import { AvatarHeaderModule } from '../../../shared/avatar-header/avatar-header.module';
import { ImageTooltipsModule } from '../../../shared/image-tooltips/image-tooltips.module';
import { MyBusinessRoutingModule } from './my-business-routing.module';
// Pages
import { ChangeCategoryPage } from './change-category/change-category';
import { PlansPage } from './plans/plans';
import { FlyerPage } from './flyer/flyer';
import { BusinessHoursPage } from './business-hours/business-hours';
import { PipesModule } from '../../../pipes/pipes.module';
import { OptionsPayComponent } from '../../../components/options-pay/options-pay.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MyBusinessRoutingModule,
        AvatarHeaderModule,
        ImageTooltipsModule,
        PipesModule
    ],
    declarations: [
        MyBusinessPage,
        ChangeCategoryPage,
        PlansPage,
        FlyerPage,
        BusinessHoursPage,
        OptionsPayComponent
    ],
    entryComponents: [
        OptionsPayComponent
    ]
})
export class MyBusinessModule {
}
