import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { AvatarHeaderModule } from '../../../shared/avatar-header/avatar-header.module';
import { ImageTooltipsModule } from '../../../shared/image-tooltips/image-tooltips.module';
import { MyBusinessRoutingModule } from './my-business-routing.module';
import { PipesModule } from '../../../pipes/pipes.module';
// Pages
import { MyBusinessPage } from './my-business';
import { ChangeCategoryPage } from './change-category/change-category';
import { PlansPage } from './plans/plans';
import { FlyerPage } from './flyer/flyer';
import { BusinessHoursPage } from './business-hours/business-hours';
import { TransferPage } from './plans/transfer/transfer';
import { CashPage } from './plans/cash/cash';
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
        TransferPage,
        CashPage,
        OptionsPayComponent
    ],
    entryComponents: [
        TransferPage,
        CashPage,
        OptionsPayComponent
    ]
})
export class MyBusinessModule {
}
