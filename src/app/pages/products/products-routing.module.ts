import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsPage} from './products';
import {AddProductPage} from './add-product/add-product';



const routes: Routes = [
    {
        path: '',
        component: ProductsPage
    },
    {
        path: 'add-product',
        component: AddProductPage
    },
    {
        path: 'edit-product',
        component: AddProductPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsPageRoutingModule { }
