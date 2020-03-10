import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CloseToMeRoutingModule} from './close-to-me-routing.module';
import {CloseToMePage} from './close-to-me';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CloseToMeRoutingModule
    ],
    declarations: [CloseToMePage]
})
export class CloseToMeModule {
}
