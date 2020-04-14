import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'plural'
})
export class PluralPipe implements PipeTransform {
    transform(value: number, text: string): string {

        let phrase = String(value) + ' ';

        if (value === 1) {
            phrase = phrase + text;
        } else {
            const words = text.split(' ');
            for (const word of words) {
                phrase = phrase + word + 's ';
            }
        }
        return phrase;
    }
}
