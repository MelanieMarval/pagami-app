import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapPage} from './map-page';

const routes: Routes = [
    {
        path: '',
        component: MapPage,
        children: [
            {
                path: 'search',
                children: [
                    {
                        path: 'shop',
                        loadChildren: () => import('../../../pages/shop/shop.module').then(m => m.ShopModule)
                    }
                ]
            },
            {
                path: 'register-business'
            },
            {
                path: 'find-my-business'
            },
            {
                path: 'shop',
                loadChildren: () => import('../../../pages/shop/shop.module').then(m => m.ShopModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule {
}
