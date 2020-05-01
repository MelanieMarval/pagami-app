import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapRoutingModule } from './map-routing.module';
import { IonBottomDrawerModule } from '../../../shared/ion-bottom-drawer/ion-bottom-drawer.module';

// Components
import { NearbyPage } from './nearby/nearby';
import { AvatarHeaderModule } from '../../../shared/avatar-header/avatar-header.module';
import { MapPage } from './map-page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MapRoutingModule,
        IonBottomDrawerModule,
        AvatarHeaderModule
    ],
    declarations: [MapPage, NearbyPage],
    providers: []
})
export class MapModule {
}
