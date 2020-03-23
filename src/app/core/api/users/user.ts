export interface User {
    name?: string;
    lastname?: string;
    photoUrl?: string;
    email?: string;
    phone?: string;
    location?: string;
    notifications?: boolean;
    fillOrders?: boolean;
    terms?: boolean;
    state?: string;
    createTime?: string;
    lastUpdate?: string;
    // TODO, add another elements from this model
}