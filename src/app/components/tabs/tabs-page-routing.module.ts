import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'close-to-me',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/close-to-me/close-to-me.module').then(m => m.CloseToMeModule)
          }
        ]
      },
      {
        path: 'my-business',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/my-business/my-business.module').then(m => m.MyBusinessModule)
          }
        ]
      },
      {
        path: 'register-business',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/register-business/register-business.module').then(m => m.RegisterBusinessModule)
          }
        ]
      },
      {
        path: 'wallet',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/wallet/wallet.module').then(m => m.WalletModule)
          }
        ]
      },
      {
        path: 'close-to-me',
        redirectTo: '/app/tabs/close-to-me',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

