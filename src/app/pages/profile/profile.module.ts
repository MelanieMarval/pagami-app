import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile';
import { AutocompleteComponent } from '../modules/google-places/google-places.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CoreModule,
        RouterModule.forChild([{path: '', component: ProfilePage}])
    ],
    declarations: [ProfilePage, AutocompleteComponent]
})
export class ProfileModule {
}
