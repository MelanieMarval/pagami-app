import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { MyBusinessPage } from './my-business/my-business';
import { RegisterBusinessPage } from './register-business/register-business';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'close-to-me',
                loadChildren: () => import('./close-to-me/close-to-me.module').then(m => m.CloseToMeModule)
            },
            {
                path: 'my-business',
                component: MyBusinessPage
            },
            {
                path: 'wallet',
                loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
            },
            {
                path: '**',
                redirectTo: 'close-to-me/search',
                pathMatch: 'full'
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}

