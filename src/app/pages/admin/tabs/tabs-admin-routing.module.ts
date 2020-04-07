import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsAdmin } from './tabs-admin';

const routes: Routes = [
    {
        path: '',
        component: TabsAdmin,
        children: [
            {
                path: 'activity',
                loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
            },
            {
                path: 'businesses',
                loadChildren: () => import('./businesses/businesses.module').then(m => m.BusinessesModule)
            },
            {
                path: 'records',
                loadChildren: () => import('./records/records.module').then(m => m.RecordsModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            },
            {
                path: '**',
                redirectTo: 'activity',
                pathMatch: 'full'
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsAdminRoutingModule {
}

