export interface User {
    id?: string;
    name?: string;
    lastname?: string;
    photoUrl?: string;
    email?: string;
    phone?: string;
    location?: {
        country?: string;
        address?: string;
    };
    notifications?: boolean;
    fillOrders?: boolean;
    terms?: boolean;
    status?: string;
    createTime?: string;
    lastUpdate?: string;
    type?: string;
    // TODO, add another elements from this model
}
