import { Place } from '../core/api/places/place';
import { PLACES } from './Const';
import { WeekDayHours } from '../core/api/places/week-day-hours';
import { BusinessHours } from '../core/api/places/business-hours';

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
           return `Estas aqui.`;
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
        } else if (place.category.icon === 'estacionamiento_motos') {
            return `assets/marker-icons/estacionamiento_motos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'estacionamiento_vehiculos') {
            return `assets/marker-icons/estacionamiento_vehiculos${PlaceUtils.getIconSuffix(place, suffix)}`;
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
        } else if (place.category.icon === 'taller_motos') {
            return `assets/marker-icons/taller_motos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'taller_vehiculos') {
            return `assets/marker-icons/taller_vehiculos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'taxi') {
            return `assets/marker-icons/taxi${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_deporte') {
            return `assets/marker-icons/tienda_deporte${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_motos') {
            return `assets/marker-icons/tienda_motos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_vehiculos') {
            return `assets/marker-icons/tienda_vehiculos${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'tienda_ropa') {
            return `assets/marker-icons/tienda_ropa${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'veterinario') {
            return `assets/marker-icons/veterinario${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'servicios') {
            return `assets/marker-icons/servicios${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === '3dcorte') {
            return `assets/marker-icons/3dcorte${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'calzado') {
            return `assets/marker-icons/calzado${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'carniceria') {
            return `assets/marker-icons/carniceria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'cerrajeria') {
            return `assets/marker-icons/cerrajeria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'diseno_programacion') {
            return `assets/marker-icons/diseno_programacion${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'naturista') {
            return `assets/marker-icons/naturista${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'reparacion_llantas') {
            return `assets/marker-icons/reparacion_llantas${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'solucionesempr') {
            return `assets/marker-icons/solucionesempr${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'turismo') {
            return `assets/marker-icons/turismo${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'vivero') {
            return `assets/marker-icons/vivero${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'joyeria') {
            return `assets/marker-icons/joyeria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'relojeria') {
            return `assets/marker-icons/relojeria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'muebles') {
            return `assets/marker-icons/muebles${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'casa_cambio') {
            return `assets/marker-icons/casa_cambio${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'optica') {
            return `assets/marker-icons/optica${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'negocio_de_bebidas') {
            return `assets/marker-icons/licoreria${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else if (place.category.icon === 'comida_rapida') {
            return `assets/marker-icons/comida_rapida${PlaceUtils.getIconSuffix(place, suffix)}`;
        } else {
            return `assets/marker-icons/tienda${PlaceUtils.getIconSuffix(place, suffix)}`;
        }
    }

    private static getIconSuffix(place: Place, suffix) {
        if (place.status === PLACES.STATUS.VERIFIED && suffix) {
            if (place.hours) {
                if (!PlaceUtils.placeIsOpen(place.hours)) {
                    return '_inactivo.svg';
                }
            }
            return '_verificado.svg';
        } else if (place.status === PLACES.STATUS.ACCEPTED && suffix) {
            return '_aceptado.svg';
        } else {
            return '_icono.svg';
        }
    }

    static getSortData(registers): any[] {
        return registers.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
    }

    static placeIsOpen(daysHours: BusinessHours) {
        const currentDay = new Date();

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = days[currentDay.getDay()];

        const hours: WeekDayHours = daysHours[dayName];
        if (!hours.active) {
            return false;
        }
        const currentHour = currentDay.getHours();
        const currentMinute = currentDay.getMinutes();
        let from = hours.hoursOne.from.split(':')[0];
        let to = hours.hoursOne.to.split(':')[0];
        let toMin = hours.hoursOne.to.split(':')[1];
        if ((Number(currentHour) >= Number(from)) && (Number(currentHour) <= Number(to))) {
            return currentHour !== Number(to) || currentMinute < Number(toMin);
        } else {
            if (hours.breakTime) {
                from = hours.hoursTwo.from.split(':')[0];
                to = hours.hoursTwo.to.split(':')[0];
                toMin = hours.hoursTwo.to.split(':')[1];
                if ((Number(currentHour) >= Number(from)) && (Number(currentHour) <= Number(to))) {
                    return currentHour !== Number(to) || currentMinute < Number(toMin);
                }
            }
            return false;
        }
    }

}
