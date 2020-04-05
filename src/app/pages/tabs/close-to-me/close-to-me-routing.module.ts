import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CloseToMePage} from './close-to-me';
import {NearbyPage} from './nearby/nearby';
import { RegisterBusinessPage } from '../register-business/register-business';

const routes: Routes = [
    {
        path: '',
        component: CloseToMePage,
        children: [
            {
                path: 'search',
                component: NearbyPage
            },
            {
                path: 'register-business',
                component: RegisterBusinessPage
            },
            {
                path: 'find-my-business'
            }
        ],
    },
    {
        path: 'nearby',
        component: NearbyPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CloseToMeRoutingModule { }
