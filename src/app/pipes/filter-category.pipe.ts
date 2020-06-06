import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCategory',
    pure: false
})
export class FilterCategoryPipe implements PipeTransform {

    transform(icons: any[], category: string): any {
        if (category === undefined) {
            return icons;
        } else {
            return icons.filter(icon => {
                if (icon.type === category) {
                    return icon;
                }
            });
        }
    }

}
