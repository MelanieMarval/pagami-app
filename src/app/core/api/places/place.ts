import { Flyer } from './flyer';

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
        subCategory?: number;
    };
    flyer?: Flyer;
    location?: {
        address?: string;        // escrito por el usuario
        addressLine?: string;   // extraido de google
        postalCode?: string;
        acronym?: string;
        country?: string;
        state?: string;
        city?: string;
    };
    phone?: string;
    allowHome?: boolean;
    dialCode?: string;
    whatsapp?: string;
    website?: string;
    type?: string;
    rejectedReason?: string;
    status?: string;
    createTime?: string;
    lastUpdate?: string;
    distance?: number; // in meters
    claim?: {
        claimId?: string;
        createdTime?: object;
        status?: string;
        userId?: string;
    };
    // TODO, add another elements from this model
}

export interface PlaceStats {
    accepted: number;
    expired: number;
    verified: number;
    total: number;
}
