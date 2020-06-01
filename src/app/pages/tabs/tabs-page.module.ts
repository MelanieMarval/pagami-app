import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { WalletModule } from './wallet/wallet.module';
import { AvatarHeaderModule } from '../../shared/avatar-header/avatar-header.module';
import { FormsModule } from '@angular/forms';
import { ChangeCategoryPage } from './my-business/change-category/change-category';
import { PlansPage } from './my-business/plans/plans';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WalletModule,
        TabsPageRoutingModule,
        AvatarHeaderModule,
        FormsModule,
        PipesModule
    ],
    declarations: [
        TabsPage,
        PlansPage,
        ChangeCategoryPage
    ],
    providers: []
})
export class TabsModule {
}
