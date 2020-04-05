import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseToMeRoutingModule } from './close-to-me-routing.module';
import { IonBottomDrawerModule } from '../../../modules/ion-bottom-drawer/ion-bottom-drawer.module';

// Components
import { CloseToMePage } from './close-to-me';
import { NearbyPage } from './nearby/nearby';
import { AvatarHeaderModule } from '../../../modules/avatar-header/avatar-header.module';
import { RegisterBusinessPage } from '../register-business/register-business';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CloseToMeRoutingModule,
        IonBottomDrawerModule,
        AvatarHeaderModule
    ],
    declarations: [CloseToMePage, NearbyPage, RegisterBusinessPage],
    providers: []
})
export class CloseToMeModule {
}
