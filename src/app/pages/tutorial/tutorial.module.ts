import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TutorialPage } from './tutorial';
import { TutorialPageRoutingModule } from './tutorial-routing.module';
import { ModalPage } from './modal/modal';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TutorialPageRoutingModule,
    ],
    declarations: [
        TutorialPage,
        ModalPage
    ],
    exports: [ModalPage],
    entryComponents: [
        TutorialPage,
        ModalPage
    ]
})

export class TutorialModule {
}
