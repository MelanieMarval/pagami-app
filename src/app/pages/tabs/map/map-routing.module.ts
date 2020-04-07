import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MapPage } from './map-page';

const routes: Routes = [
    {
        path: '',
        component: MapPage,
        children: [
            {
                path: 'search'
            },
            {
                path: 'register-business'
            },
            {
                path: 'find-my-business'
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }
