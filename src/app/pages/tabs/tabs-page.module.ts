import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { WalletModule } from './wallet/wallet.module';
import { MyBusinessPage } from './my-business/my-business';
import { RegisterBusinessPage } from './register-business/register-business';
import { AvatarHeaderModule } from '../../modules/avatar-header/avatar-header.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WalletModule,
        TabsPageRoutingModule,
        AvatarHeaderModule,
        FormsModule
    ],
    declarations: [
        TabsPage,
        MyBusinessPage,
        RegisterBusinessPage
    ],
    providers: []
})
export class TabsModule {
}
