import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
    transform(value: string, all: boolean = true): string {

        value = value.toLowerCase();
        const names = value.split(' ');

        if (all) {
            for (let i = 0; i < names.length; i++) {
                names[i] = names[i][0].toUpperCase() + names[i].substr(1);
            }
        } else {
            names[0] = names[0][0].toUpperCase() + names[0].substr(1);
        }
        return names.join(' ');
    }
}
