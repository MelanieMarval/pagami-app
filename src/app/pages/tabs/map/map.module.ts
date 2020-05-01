import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MapRoutingModule} from './map-routing.module';
import {IonBottomDrawerModule} from '../../../shared/ion-bottom-drawer/ion-bottom-drawer.module';

// Components
import {NearbyPage} from './nearby/nearby';
import {AvatarHeaderModule} from '../../../shared/avatar-header/avatar-header.module';
import {MapPage} from './map-page';
import {ShopPage} from '../../shop/shop';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MapRoutingModule,
        IonBottomDrawerModule,
        AvatarHeaderModule,
        SharedModule
    ],
    declarations: [MapPage, NearbyPage, ShopPage],
    providers: []
})
export class MapModule {
}
