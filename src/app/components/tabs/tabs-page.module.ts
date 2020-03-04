import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs-page';
import {TabsPageRoutingModule} from './tabs-page-routing.module';

import {CloseToMeModule} from '../../pages/close-to-me/close-to-me.module';
import {MyBusinessModule} from '../../pages/my-business/my-business.module';
import {RegisterBusinessModule} from '../../pages/register-business/register-business.module';
import {WalletModule} from '../../pages/wallet/wallet.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CloseToMeModule,
        MyBusinessModule,
        RegisterBusinessModule,
        WalletModule,
        TabsPageRoutingModule
    ],
    declarations: [
        TabsPage,
    ]
})
export class TabsModule {
}
