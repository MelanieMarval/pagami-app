import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPage } from './orders';
import { OrderDetailsPage } from './order-details/order-details';



const routes: Routes = [
    {
        path: '',
        component: OrdersPage
    },
    {
        path: 'details/:id',
        component: OrderDetailsPage
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsPageRoutingModule { }
