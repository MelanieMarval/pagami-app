import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UserRegisterPage } from './user-register';
import { UserRegisterPageRoutingModule } from './user-register-routing.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        UserRegisterPageRoutingModule,
        FormsModule,
        CoreModule
    ],
    declarations: [UserRegisterPage],
    entryComponents: [UserRegisterPage],
})

export class UserRegisterModule {
}
