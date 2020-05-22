import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UserRegisterPage } from './user-register';
import { UserRegisterPageRoutingModule } from './user-register-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { Sim } from '@ionic-native/sim/ngx';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        UserRegisterPageRoutingModule,
        FormsModule,
        IonicSelectableModule,
    ],
    declarations: [UserRegisterPage],
    entryComponents: [UserRegisterPage],
    providers: [
        Sim
    ]
})

export class UserRegisterModule {
}
