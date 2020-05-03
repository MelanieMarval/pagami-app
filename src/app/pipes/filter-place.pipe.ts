import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../core/api/places/place';

@Pipe({
    name: 'filterPlace',
    pure: false
})
export class FilterPlacePipe implements PipeTransform {

    transform(places: Place[], search: any): any {
        if (search === undefined) {
            return places;
        } else {
            return places.filter(place => {
                if (place.name && place.name.toLowerCase().includes(search.toLowerCase())) {
                    return place.name.toLowerCase().includes(search.toLowerCase());
                }
                if (place.category && place.category.name && place.category.name.toLowerCase().includes(search.toLowerCase())) {
                    return place.category.name.toLowerCase().includes(search.toLowerCase());
                }
                if (place.location && place.location.address && place.location.address.toLowerCase().includes(search.toLowerCase())) {
                    return place.location.address.toLowerCase().includes(search.toLowerCase());
                }
                if (place.location && place.location.addressLine && place.location.addressLine.toLowerCase().includes(search.toLowerCase())) {
                    return place.location.addressLine.toLowerCase().includes(search.toLowerCase());
                }
            });
        }
    }

}
