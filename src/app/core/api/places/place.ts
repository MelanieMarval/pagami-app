export interface Place {
    id?: string;
    latitude: number;
    longitude: number;
    accuracy?: number;
    registeredBy?: string;
    photoUrl?: string;
    name?: string;
    icon?: string;
    location?: string;
    phone?: string;
    samePhone?: boolean;
    whatsapp?: string;
    website?: string;
    type?: string;
    status?: string;
    createTime?: string;
    lastUpdate?: string;
    // TODO, add another elements from this model
}
