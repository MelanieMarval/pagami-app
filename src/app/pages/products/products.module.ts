import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {ProductsPageRoutingModule} from './products-routing.module';

import {ProductsPage} from './products';
import {AddProductPage} from './add-product/add-product';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        ProductsPageRoutingModule
    ],
    declarations: [
        ProductsPage,
        AddProductPage
    ]
})
export class ProductsModule {
}
