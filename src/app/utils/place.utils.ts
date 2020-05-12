import { Place } from '../core/api/places/place';
import { PLACES } from './Const';

export class PlaceUtils {

    static getThumbnailPhoto(register: Place) {
        if (register.status === 'INCOMPLETE' || !register.photoUrl) {
            return'assets/img/no-business-image.png';
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

    static getMarker(place: Place, suffix = true): string {
        if (place.category.icon === 'abasto') {
            return `assets/marker-icons/abasto${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'barberia_y_peluqueria') {
            return `assets/marker-icons/peluqueria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'cafe') {
            return `assets/marker-icons/cafe${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'comida_rapida') {
            return `assets/marker-icons/comida_rapida${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'estacionamiento') {
            return `assets/marker-icons/estacionamiento${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'fabrica') {
            return `assets/marker-icons/fabrica${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'farmacia') {
            return `assets/marker-icons/farmacia${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'fruteria') {
            return `assets/marker-icons/fruteria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'gimnasio') {
            return `assets/marker-icons/gimnasio${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'heladeria') {
            return `assets/marker-icons/heladeria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'hotel') {
            return `assets/marker-icons/hotel${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'hotel') {
            return `assets/marker-icons/hotel${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'negocio_temporal') {
            return `assets/marker-icons/negocio_temporal${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'odontologia') {
            return `assets/marker-icons/odontologia${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'odontologia') {
            return `assets/marker-icons/odontologia${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'pagami') {
            return `assets/marker-icons/pagami${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'panaderia') {
            return `assets/marker-icons/panaderia${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'perfumeria') {
            return `assets/marker-icons/perfumeria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'piscina') {
            return `assets/marker-icons/piscina${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'pizzeria') {
            return `assets/marker-icons/pizzeria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'restaurante') {
            return `assets/marker-icons/restaurante${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'servicio_de_reparacion') {
            return `assets/marker-icons/servicio_reparacion${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'servicios_medicos') {
            return `assets/marker-icons/servicio_medico${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'servicio_tecnico') {
            return `assets/marker-icons/servicio_tecnico${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'taller') {
            return `assets/marker-icons/taller${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'taxi') {
            return `assets/marker-icons/tienda_vehiculos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_deporte') {
            return `assets/marker-icons/tienda_deporte${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_motos') {
            return `assets/marker-icons/tienda_motos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_ropa') {
            return `assets/marker-icons/tienda_ropa${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'veterinario') {
            return `assets/marker-icons/veterinario${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else {
            return `assets/marker-icons/tienda${PlaceUtils.getIconSuffix(place, suffix)}`;
        }
    }

    private static getIconSuffix(place: Place, suffix) {
        if (place.status === PLACES.STATUS.VERIFIED && suffix) {
            return '_verificado.svg';
        } else if (place.status === PLACES.STATUS.ACCEPTED && suffix) {
            return '_aceptado.svg';
        } else {
            return '_icono.svg';
        }
    }

    static getSortData(registers): any[] {
        // console.log(registers.sort((a, b) => b.lastUpdate - a.lastUpdate));
        return registers.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
    }

}
