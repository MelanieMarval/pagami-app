import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile';
import { CoreModule } from '../../core/core.module';
import { EmptyPage } from './empty/empty';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CoreModule,
        RouterModule.forChild([{path: '', component: ProfilePage}])
    ],
    declarations: [ProfilePage, EmptyPage]
})
export class ProfileModule {
}
