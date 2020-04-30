import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

    transform(image: any): string {
        if (image) {
            return image;
        }
        return 'assets/img/no-user-image.png';
    }

}
