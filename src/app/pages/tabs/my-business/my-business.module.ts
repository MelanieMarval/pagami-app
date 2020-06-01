import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyBusinessPage } from './my-business';
import { AvatarHeaderModule } from '../../../shared/avatar-header/avatar-header.module';
import { ImageTooltipsModule } from '../../../shared/image-tooltips/image-tooltips.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        AvatarHeaderModule,
        RouterModule.forChild([{path: '', component: MyBusinessPage}]),
        ImageTooltipsModule
    ],
    declarations: [ MyBusinessPage ]
})
export class MyBusinessModule {
}
