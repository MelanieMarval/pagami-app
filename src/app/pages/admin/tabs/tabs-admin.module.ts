import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsAdmin } from './tabs-admin';
import { TabsAdminRoutingModule } from './tabs-admin-routing.module';

import { UsersModule } from './users/users.module';
import { AvatarHeaderModule } from '../../../shared/avatar-header/avatar-header.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        UsersModule,
        TabsAdminRoutingModule,
        AvatarHeaderModule,
        FormsModule,
    ],
    declarations: [
        TabsAdmin
    ],
    exports: [
    ],
    providers: []
})
export class TabsModule {
}
