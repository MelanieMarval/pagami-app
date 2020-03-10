import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CloseToMePage} from './close-to-me';

const routes: Routes = [
    {
        path: '',
        component: CloseToMePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CloseToMeRoutingModule { }
