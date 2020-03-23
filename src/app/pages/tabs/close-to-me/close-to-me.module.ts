import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseToMeRoutingModule } from './close-to-me-routing.module';

// Components
import { CloseToMePage } from './close-to-me';
import { NearbyPage } from './nearby/nearby';
import { IonBottomDrawerModule } from '../../../modules/ion-bottom-drawer/ion-bottom-drawer.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CloseToMeRoutingModule,
        IonBottomDrawerModule,
    ],
    declarations: [CloseToMePage, NearbyPage],
    providers: []
})
export class CloseToMeModule {
}
