import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AvatarHeaderComponent } from './avatar-header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [AvatarHeaderComponent],
    imports: [IonicModule, RouterModule, CommonModule, PipesModule],
    exports: [AvatarHeaderComponent]
})
export class AvatarHeaderModule {}
