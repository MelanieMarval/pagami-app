import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletPage } from './wallet';
import { RouterModule } from '@angular/router';
import { BackgroundEmptyModule } from '../../../shared/background-empty/background-empty.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '', component: WalletPage
        }]),
        BackgroundEmptyModule
    ],
    declarations: [WalletPage]
})
export class WalletModule {
}
