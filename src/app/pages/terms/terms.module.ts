import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsPage } from './terms';
import { ModalPage } from './modal/modal';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TermsPage}]),
    ],
    declarations: [
        TermsPage,
        ModalPage
    ],
    exports: [ModalPage],
    entryComponents: [ModalPage]
})
export class TermsModule {
}
