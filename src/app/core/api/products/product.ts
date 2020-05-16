export interface Product {
    id?: string;
    placeId: string;
    name: string;
    stock: number;
    price: number;
    description?: string;
    photoUrl?: string;
    available?: boolean;
    createTime?: any;
    lastUpdate?: any;
    registeredBy?: string;
}
