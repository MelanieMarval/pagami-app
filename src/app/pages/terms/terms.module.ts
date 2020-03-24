import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsPage } from './terms';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TermsPage}]),
    ],
    declarations: [
        TermsPage,
    ],
    exports: [],
    entryComponents: []
})
export class TermsModule {
}
