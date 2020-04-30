export class PagamiGeo {

    public latitude: number;
    public longitude: number;
    public accuracy: number;

    constructor(latitude: number, longitude: number, accuracy: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
    }

    lat() {
        return this.latitude;
    }

    lng() {
        return this.longitude;
    }
}

export function mapToGeoPoint(coors: Coordinates): PagamiGeo {
    return new PagamiGeo(coors.latitude, coors.longitude, coors.accuracy);
}
