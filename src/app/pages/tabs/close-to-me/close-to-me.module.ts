import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseToMeRoutingModule } from './close-to-me-routing.module';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

// Components
import { CloseToMePage } from './close-to-me';
import { NearbyPage } from './nearby/nearby';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CloseToMeRoutingModule,
        IonBottomDrawerModule,
    ],
    declarations: [CloseToMePage, NearbyPage]
})
export class CloseToMeModule {
}
