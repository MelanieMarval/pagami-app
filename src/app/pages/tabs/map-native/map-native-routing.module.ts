import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapNativePage } from './map-native.page';

const routes: Routes = [
  {
    path: '',
    component: MapNativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapNativePageRoutingModule {}
