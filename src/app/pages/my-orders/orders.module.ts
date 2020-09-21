import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {ProductsPageRoutingModule} from './orders-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { OrdersPage } from './orders';
import { OrderDetailsPage } from './order-details/order-details';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        ProductsPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ],
    declarations: [
        OrdersPage,
        OrderDetailsPage
    ]
})
export class OrdersModule {
}
