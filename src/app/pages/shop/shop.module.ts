import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {ShopPageRoutingModule} from './shop-routing.module';

import {ShopPage} from './shop';
import {ServicesPage} from './services/services';
import {ProductsPage} from './products/products';
import {OrderSummaryPage} from './order-summary/order-summary';
import { PipesModule } from '../../pipes/pipes.module';
import { FlyerPage } from './flyer/flyer';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        ShopPageRoutingModule,
        PipesModule,
        FormsModule
    ],
    declarations: [
        ShopPage,
        FlyerPage,
        ProductsPage,
        ServicesPage,
        OrderSummaryPage,
    ]
})
export class ShopModule {
}
