import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordDetailsPage } from './record-details';

const routes: Routes = [
    {
        path: '',
        component: RecordDetailsPage
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecordDetailsRoutingModule { }
