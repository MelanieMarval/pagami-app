import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessClaimPage } from './business-claim';
import { PlansPage } from './plans/plans';

const routes: Routes = [
    {
        path: '',
        component: BusinessClaimPage,
        children: [
            {
                path: 'plans',
                component: PlansPage
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BusinessClaimRoutingModule {
}

