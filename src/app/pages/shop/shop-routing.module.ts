import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopPage} from './shop';
import {ProductsPage} from './products/products';
import {ServicesPage} from './services/services';
import {OrderSummaryPage} from './order-summary/order-summary';



const routes: Routes = [
    {
        path: '',
        component: ShopPage
    },
    {
        path: 'products',
        component: ProductsPage
    },
    {
        path: 'services',
        component: ServicesPage
    },
    {
        path: 'order-summary',
        component: OrderSummaryPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsPageRoutingModule { }
