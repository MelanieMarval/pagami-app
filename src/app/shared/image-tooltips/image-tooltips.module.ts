import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageTooltipsComponent } from './image-tooltips.component';

@NgModule({
    declarations: [ImageTooltipsComponent],
    imports: [IonicModule, RouterModule, CommonModule],
    exports: [ImageTooltipsComponent]
})
export class ImageTooltipsModule {}
