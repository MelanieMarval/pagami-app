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


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        ShopPageRoutingModule,
        PipesModule
    ],
    declarations: [
        ShopPage,
        ProductsPage,
        ServicesPage,
        OrderSummaryPage,
    ]
})
export class ShopModule {
}
