import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './pages/tabs/tabs-page';
import {DetailsBusinessPage} from './pages/details-business/details-business';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tutorial',
        pathMatch: 'full'
    },
    {
        path: 'tutorial',
        loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    },
    {
        path: 'terms',
        loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule),
    },
    {
        path: 'app',
        children: [
            {
                path: 'tabs',
                loadChildren: () => import('./pages/tabs/tabs-page.module').then(m => m.TabsModule)
            },
            {
                path: 'details-business',
                component: DetailsBusinessPage
            },
            {
                path: 'profile',
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

