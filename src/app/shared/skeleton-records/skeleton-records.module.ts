import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SkeletonRecordsComponent } from './skeleton-records.component';

@NgModule({
    declarations: [SkeletonRecordsComponent],
    imports: [IonicModule, RouterModule, CommonModule],
    exports: [SkeletonRecordsComponent]
})
export class SkeletonRecordsModule {
}
