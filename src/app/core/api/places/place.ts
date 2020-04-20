export interface Place {
    id?: string;
    latitude: number;
    longitude: number;
    accuracy?: number;
    registeredBy?: string;
    photoUrl?: string;
    name?: string;
    category?: {
      name?: string;
      icon?: string;
    };
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
    distance?: number; // in meters
    // TODO, add another elements from this model
}
