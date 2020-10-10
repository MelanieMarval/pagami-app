import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapNativePageRoutingModule } from './map-native-routing.module';

import { MapNativePage } from './map-native.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapNativePageRoutingModule
  ],
  declarations: [MapNativePage]
})
export class MapNativePageModule {}
