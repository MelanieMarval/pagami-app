import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsersPage } from './users';
import { PipesModule } from '../../../../pipes/pipes.module';
import { UserProfilePage } from '../user-profile/user-profile';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: UsersPage }
        ]),
        PipesModule
    ],
    declarations: [UsersPage, UserProfilePage]
})
export class UsersModule {
}
