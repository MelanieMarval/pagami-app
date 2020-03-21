import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRegisterPage } from './user-register';

const routes: Routes = [
    {
        path: '',
        component: UserRegisterPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRegisterPageRoutingModule {
}
