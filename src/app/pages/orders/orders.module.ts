import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';

// Pages
import { OrdersPage } from './orders';
import { OrdersRoutingModule } from './orders-routing.module';
import { SummaryPage } from './summary/summary';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        OrdersRoutingModule,
        HttpClientModule,
        PipesModule,
        FormsModule
    ],
    declarations: [
        OrdersPage,
        SummaryPage
    ]
})
export class OrdersModule {
}
