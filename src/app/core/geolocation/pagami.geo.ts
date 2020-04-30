export interface PagamiGeo {
    accuracy: number;
    latitude: number;
    longitude: number;
}

export function mapToGeoPoint(coors: Coordinates): PagamiGeo {
    return {
        accuracy: coors.accuracy,
        latitude: coors.latitude,
        longitude: coors.longitude,
    };
}

export function mapToLatLng(geo: PagamiGeo): any {
    return {
        lat: geo.latitude,
        lng: geo.longitude,
    };
}
