import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivityPage } from './activity';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule.forChild([{
            path: '', component: ActivityPage
        }]),
    ],
    declarations: [ ActivityPage ]
})
export class ActivityModule {
}
