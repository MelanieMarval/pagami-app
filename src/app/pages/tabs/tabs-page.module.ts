import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs-page';
import {TabsPageRoutingModule} from './tabs-page-routing.module';

import {WalletModule} from './wallet/wallet.module';
import {MyBusinessPage} from './my-business/my-business';
import {RegisterBusinessPage} from './register-business/register-business';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WalletModule,
        TabsPageRoutingModule
    ],
    declarations: [
        TabsPage,
        MyBusinessPage,
        RegisterBusinessPage
    ],
    providers: [
        Geolocation
    ]
})
export class TabsModule {
}
