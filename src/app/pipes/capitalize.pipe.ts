import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'capitalize'
})
// TODO, revisar porque tiene un fallo con los acentos
export class CapitalizePipe implements PipeTransform {
    transform(value: string, all: boolean = true): string {
        value = value.toLowerCase();
        const names = value.split(' ');

        if (all) {
            for (let i = 0; i < names.length; i++) {
                if (names[i].trim() !== '' && names[i].length > 1) {
                    names[i] = names[i][0].toUpperCase() + names[i].substr(1);
                }
            }
        } else {
            names[0] = names[0][0].toUpperCase() + names[0].substr(1);
        }
        return names.join(' ');
    }
}
