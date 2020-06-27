export interface Product {
    id?: string;
    placeId: string;
    name: string;
    stock: number;
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
