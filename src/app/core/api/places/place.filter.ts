export interface PlaceFilterDto {
    latitude: number;
    longitude: number;
    radius: number; // kilometers
    placeType: string;
}
