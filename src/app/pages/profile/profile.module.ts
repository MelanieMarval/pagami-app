import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile';
import { PipesModule } from '../../pipes/pipes.module';
import { Sim } from '@ionic-native/sim/ngx';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ProfilePage}]),
        PipesModule,
        IonicSelectableModule
    ],
    declarations: [ProfilePage],
    providers: [
        Sim
    ]
})
export class ProfileModule {
}
