export interface Service {
    id?: string;
    placeId: string;
    name: string;
    price: number;
    localPrice?: number;
    localCurrency?: string;
    description?: string;
    photoUrl?: string;
    available?: boolean;
    createTime?: any;
    lastUpdate?: any;
    registeredBy?: string;
}
