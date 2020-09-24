import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPage } from './orders';
import { SummaryPage } from './summary/summary';


const routes: Routes = [
    {
        path: '',
        component: OrdersPage
    },
    {
        path: 'summary/:id',
        component: SummaryPage
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}
