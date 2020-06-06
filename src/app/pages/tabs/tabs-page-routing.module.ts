import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { ChangeCategoryPage } from './my-business/change-category/change-category';
import { PlansPage } from './my-business/plans/plans';
import { FlyerPage } from './my-business/flyer/flyer';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: 'map',
                pathMatch: 'full'
            },
            {
                path: 'map',
                loadChildren: () => import('./map/map.module').then(m => m.MapModule)
            },
            {
                path: 'my-business',
                loadChildren: () => import('./my-business/my-business.module').then(m => m.MyBusinessModule)
            },
            {
                path: 'wallet',
                loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
            },
            {
                path: 'wallet/activity',
                loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
            },
        ],
    },
    // For sub-page my business
    { path: 'my-business/plans',            component: PlansPage },
    { path: 'my-business/change-category',  component: ChangeCategoryPage },
    { path: 'my-business/flyer',            component: FlyerPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}

