export interface User {
    id?: string;
    name?: string;
    lastname?: string;
    photoUrl?: string;
    email?: string;
    phone?: string;
    phoneCode?: string;
    location?: {
        country?: string;
        address?: string;
        code?: string;
    };
    notifications?: boolean;
    terms?: boolean;
    status?: string;
    createTime?: string;
    lastUpdate?: string;
    type?: string;
    totalPlaces?: number;
    // TODO, add another elements from this model
}

export interface UserStats {
    total: number;
    active: number;
    disabled: number;
}
