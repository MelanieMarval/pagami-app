import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegisterBusinessPage} from './register-business';
import {DetailsPage} from './details/details';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: RegisterBusinessPage},
            {path: 'details', component: DetailsPage}
        ])
    ],
    declarations: [RegisterBusinessPage, DetailsPage]
})
export class RegisterBusinessModule {
}
