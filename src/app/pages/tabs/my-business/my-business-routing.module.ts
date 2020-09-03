import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBusinessPage } from './my-business';
import { BusinessHoursPage } from './business-hours/business-hours';
import { ChangeCategoryPage } from './change-category/change-category';
import { PlansPage } from './plans/plans';
import { FlyerPage } from './flyer/flyer';


const routes: Routes = [
    {
        path: '',
        component: MyBusinessPage,
    },
    {
        path: 'change-category',
        component: ChangeCategoryPage
    },
    {
        path: 'plans',
        component: PlansPage
    },
    {
        path: 'flyer',
        component: FlyerPage
    },
    {
        path: 'business-hours',
        component: BusinessHoursPage
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyBusinessRoutingModule {
}

