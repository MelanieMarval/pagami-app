export interface PlaceFilter {
    latitude: number;
    longitude: number;
    radius: number; // kilometers
    placeType?: string;
}
