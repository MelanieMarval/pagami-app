import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs-page';
import {CloseToMePage} from './close-to-me/close-to-me';
import {MyBusinessPage} from './my-business/my-business';
import {RegisterBusinessPage} from './register-business/register-business';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                component: CloseToMePage
            },
            {
                path: 'close-to-me',
                component: CloseToMePage
            },
            {
                path: 'my-business',
                component: MyBusinessPage
            },
            {
                path: 'register-business',
                component: RegisterBusinessPage
            },
            {
                path: 'wallet',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
                    }
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}

