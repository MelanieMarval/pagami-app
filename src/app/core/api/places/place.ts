export interface Place {
    id?: string;
    latitude: number;
    longitude: number;
    accuracy?: number;
    registeredBy?: string;
    photoUrl?: string;
    name?: string;
    icon?: string;
    location?: {
        address?: string        // escrito por el usuario
        addressLine?: string,   // extraido de google
        postalCode?: string,
        acronym?: string,
        country?: string,
        state?: string,
        city?: string,
    };
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
