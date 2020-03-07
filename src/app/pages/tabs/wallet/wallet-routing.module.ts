import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WalletPage} from './wallet';
import {ActivityPage} from './activity/activity';


const routes: Routes = [
    {
        path: '',
        component: WalletPage
    },
    {
        path: 'activity',
        component: ActivityPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletPageRoutingModule { }
