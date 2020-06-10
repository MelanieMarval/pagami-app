import { PLACES } from './Const';

export const CATEGORY_ICONS = [
    { name: 'Pagami',                      route: 'pagami',                    type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.PAGAMI},
    { name: 'Tienda (Otros)',              route: 'tienda',                    type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Servicio (Otros)',            route: 'servicios',                 type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Abasto',                      route: 'abasto',                     type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Barbería y Peluquería',       route: 'barberia_y_peluqueria',      type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.BEAUTY},
    { name: 'Café',                        route: 'cafe',                       type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
//  { name: 'Comida Rapida',               route: 'comida_rapida',              type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
//  { name: 'Estacionamiento',             route: 'estacionamiento',            type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Farmacia',                    route: 'farmacia',                   type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Frutería',                    route: 'fruteria',                   type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Fábrica',                     route: 'fabrica',                    type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.INDUSTRY},
    { name: 'Gimnasio',                    route: 'gimnasio',                   type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SPORT},
    { name: 'Heladería',                   route: 'heladeria',                  type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
    { name: 'Hotel',                       route: 'hotel',                      type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.HOTELERY},
    { name: 'Negocio de Bebidas',          route: 'negocio_de_bebidas',         type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
    { name: 'Negocio Temporal',            route: 'negocio_temporal',           type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
    { name: 'Odontología',                 route: 'odontologia',                type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Panadería',                   route: 'panaderia',                  type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
    { name: 'Perfumería',                  route: 'perfumeria',                 type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Piscina',                     route: 'piscina',                    type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SPORT},
    { name: 'Pizzería',                    route: 'pizzeria',                   type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
    { name: 'Restaurante',                 route: 'restaurante',                type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.FOOD},
    { name: 'Servicio de Grúas',           route: 'servicio_de_gruas',          type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Servicio de Reparación',      route: 'servicio_de_reparacion',     type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Servicio de Tatuajes',        route: 'servicio_de_tatuajes',       type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Servicio Técnico',            route: 'servicio_tecnico',           type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Servicios Medicos',           route: 'servicios_medicos',          type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.MEDICINE},
    { name: 'Taller de Motos',             route: 'taller_motos',               type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Taller de Vehiculos',         route: 'taller_vehiculos',           type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Taxi',                        route: 'taxi',                       type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Tienda de Deportes',          route: 'tienda_deporte',             type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda de Motos',             route: 'tienda_motos',               type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda de Vehiculos',         route: 'tienda_vehiculos',           type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda de Pinturas',          route: 'tienda_pinturas',            type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda de Ropa',             route: 'tienda_ropa',                type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Veterinario',                 route: 'veterinario',                type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.MEDICINE},
    { name: 'Carniceria',                   route: 'carniceria',                type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Cerrajeria',                   route: 'cerrajeria',                type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Diseño y Programación',        route: 'diseno_y_programacion',     type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: '3D y Corte Lazer',             route: '3d_corte',                  type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Reparación de llantas',        route: 'reparacion_llantas',        type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Estacionamiento de Motos',     route: 'estacionamiento_motos',     type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Estacionamiento de Vehiculos', route: 'estacionamiento_vehiculos', type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Soluciones Empresariales',     route: 'solucionesempr',            type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.INDUSTRY},
    { name: 'Tienda de Calzado',            route: 'calzado',                   type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda Naturista',             route: 'naturista',                 type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Turismo',                      route: 'turismo',                   type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.ENTERTAINMENT},
    { name: 'Vivero',                       route: 'vivero',                    type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Relojería',                    route: 'relojeria',                 type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda de Muebles',            route: 'muebles',                   type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Joyería',                      route: 'joyeria',                   type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Tienda de Bolsos',             route: 'tienda_bolsos',             type: PLACES.TYPE.STORE ,       subCategory: PLACES.CATEGORY.SHOP},
    { name: 'Case de Cambio',               route: 'casa_cambio',               type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SERVICE},
    { name: 'Optica',                       route: 'optica',                    type: PLACES.TYPE.SERVICE ,     subCategory: PLACES.CATEGORY.SHOP},
];
