import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServicePage} from './services';
import {AddServicePage} from './add-service/add-service';



const routes: Routes = [
    {
        path: '',
        component: ServicePage
    },
    {
        path: 'service/:action',
        component: AddServicePage
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsPageRoutingModule { }
