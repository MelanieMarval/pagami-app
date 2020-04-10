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
                return 'Esperando de aceptacion';
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
            return `A ${distance} metros de ti.`;
        }
    }
}
