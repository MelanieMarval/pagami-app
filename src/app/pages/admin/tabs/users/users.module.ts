import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersPage } from './users';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '', component: UsersPage
        }]),
        PipesModule
    ],
    declarations: [UsersPage]
})
export class UsersModule {
}
