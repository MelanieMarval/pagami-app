import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CloseToMePage} from './close-to-me';
import {NearbyPage} from './nearby/nearby';

const routes: Routes = [
    {
        path: '',
        component: CloseToMePage
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
export class CloseToMeRoutingModule {
}
