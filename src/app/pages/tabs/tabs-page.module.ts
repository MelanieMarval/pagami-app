import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { WalletModule } from './wallet/wallet.module';
import { AvatarHeaderModule } from '../../shared/avatar-header/avatar-header.module';
import { PipesModule } from '../../pipes/pipes.module';
// Pages
import { ChangeCategoryPage } from './my-business/change-category/change-category';
import { PlansPage } from './my-business/plans/plans';
import { FlyerPage } from './my-business/flyer/flyer';
import { ImageTooltipsModule } from '../../shared/image-tooltips/image-tooltips.module';
import { BusinessHoursPage } from './my-business/business-hours/business-hours';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WalletModule,
        TabsPageRoutingModule,
        AvatarHeaderModule,
        FormsModule,
        PipesModule,
        ImageTooltipsModule
    ],
    declarations: [
        TabsPage,
        PlansPage,
        ChangeCategoryPage,
        FlyerPage,
        BusinessHoursPage
    ],
    providers: []
})
export class TabsModule {
}
