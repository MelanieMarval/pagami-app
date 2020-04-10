import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

    transform(image: any): string {
        console.log(image);
        if (image) {
            return image;
        }
        return 'assets/img/no-user-image.svg';
    }

}
