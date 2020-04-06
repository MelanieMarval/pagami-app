import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OrdersPage } from './pages/orders/orders';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'tutorial',
    //     pathMatch: 'full'
    // },
    {
        path: 'tutorial',
        loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule)
    },
    {
        path: 'terms',
        loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule),
    },
    {
        path: 'user-register',
        loadChildren: () => import('./pages/user-register/user-register.module').then(m => m.UserRegisterModule),
    },
    {
        path: 'app',
        children: [
            {
                path: '',
                redirectTo: 'tabs',
                pathMatch: 'full'
            },
            {
                path: 'tabs',
                loadChildren: () => import('./pages/tabs/tabs-page.module').then(m => m.TabsModule)
            },
            {
                path: 'orders', component: OrdersPage
            },
            {
                path: 'my-products',
                loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'shop',
                loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'business-details',
                loadChildren: () => import('./pages/business-details/business-details.module').then(m => m.BusinessDetailsModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: '**',
                redirectTo: 'tabs',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'tabs',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

