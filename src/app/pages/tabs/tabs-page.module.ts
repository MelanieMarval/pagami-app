import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs-page';
import {TabsPageRoutingModule} from './tabs-page-routing.module';

import {WalletModule} from './wallet/wallet.module';
import {CloseToMePage} from './close-to-me/close-to-me';
import {MyBusinessPage} from './my-business/my-business';
import {RegisterBusinessPage} from './register-business/register-business';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WalletModule,
        TabsPageRoutingModule
    ],
    declarations: [
        TabsPage,
        CloseToMePage,
        MyBusinessPage,
        RegisterBusinessPage
    ]
})
export class TabsModule {
}
