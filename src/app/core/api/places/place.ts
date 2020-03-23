export interface Place {
    id?: string;
    latitude: number;
    longitude: number;
    accuracy?: number;
    registered_by?: string;
    // TODO, add another elements from this model
}
