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
