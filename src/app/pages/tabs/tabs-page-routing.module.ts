import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}

