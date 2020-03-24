import { Input, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AvatarHeaderComponent } from './avatar-header.component';
import { NoImagePipe } from '../../pipes/no-image.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AvatarHeaderComponent, NoImagePipe],
    imports: [IonicModule, RouterModule, CommonModule],
    exports: [AvatarHeaderComponent]
})
export class AvatarHeaderModule {}
