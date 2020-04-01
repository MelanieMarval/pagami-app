import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WalletPage} from './wallet';
import {ActivityPage} from './activity/activity';
import {WalletPageRoutingModule} from './wallet-routing.module';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        WalletPageRoutingModule
    ],
    declarations: [WalletPage, ActivityPage, CapitalizePipe]
})
export class WalletModule {
}
