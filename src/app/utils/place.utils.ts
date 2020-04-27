import { Place } from '../core/api/places/place';
import { PLACES } from './Const';

export class PlaceUtils {

    static getThumbnailPhoto(register: Place) {
        if (register.status === 'INCOMPLETE' || !register.photoUrl) {
            return undefined;
        } else {
            const arrayPhoto = register.photoUrl.split('?');
            return `${arrayPhoto[0]}_64x64?${arrayPhoto[1]}`;
        }
    }

    static getMessageStatus(status: string): string {
        switch (status) {
            case PLACES.STATUS.WAITING:
                return 'Esperando aceptacion';
            case PLACES.STATUS.ACCEPTED:
                return 'En espera de verificacion';
            case PLACES.STATUS.VERIFIED:
                return 'Verificado';
            case PLACES.STATUS.REJECTED:
                return 'Rechazado';
            case PLACES.STATUS.INCOMPLETE:
                return 'Incompleto';
            default:
                return 'Desabilitado';
        }
    }

    static getTypeSpanish(type: string): string {
        switch (type) {
            case PLACES.TYPE.SERVICE:
                return 'SERVICIO';
            case PLACES.TYPE.STORE:
                return 'TIENDA';
        }
    }

    static getMessageDistance(distance: number): string {
        if (distance === 0) {
           return `Esta aqui.`;
        } else if (distance > 2000) {
            return `A ${Math.trunc(distance / 1000)} kilometros de ti.`;
        } else {
            return `A ${Math.trunc(distance)} metros de ti.`;
        }
    }

    static getMarker(place: Place): string {
        if (place.category.subCategory === PLACES.CATEGORY.FOOD) {
            return 'assets/marker-icons/food.png';
        } else if (place.category.subCategory === PLACES.CATEGORY.HOTELERY) {
            return 'assets/marker-icons/hotelery.png';
        } else if (place.category.subCategory === PLACES.CATEGORY.MEDICINE) {
            return 'assets/marker-icons/medical.png';
        } else if (place.category.subCategory === PLACES.CATEGORY.SERVICE) {
            return 'assets/marker-icons/service.png';
        } else {
            return 'assets/marker-icons/store.png';
        }
    }

    static getSortData(registers): any[] {
        return registers.sort((a, b) => new Date(b.lastUpdate).getTime() as any - new Date(a.lastUpdate).getTime() as any);
    }

}
