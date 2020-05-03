

export const RESPONSE = {
    CODE: {
        NOT_REGISTERED: 40
    }
};

export const STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    ERROR: 500,
};

export const USER = {
    TYPE: {
        ADMIN: 'ADMIN',
        NORMAL: 'NORMAL'
    },
    STATUS: {
        REGISTERED: 'REGISTERED',
        ACTIVE: 'ACTIVE',
        DISABLED: 'DISABLED'
    }
};


export const PLACES = {
    TYPE: {
        STORE: 'STORE',
        SERVICE: 'SERVICE',
        ALL: 'ALL'
    },
    CATEGORY: {
        PAGAMI: 0,
        FOOD: 1,
        SHOP: 2,
        HOTELERY: 3,
        SERVICE: 4,
        BEAUTY: 5,
        MEDICINE: 6,
        INDUSTRY: 7,
        SPORT: 8,
        ENTERTAINMENT: 9,
        STORE: 10
    },
    STATUS: {
        WAITING: 'WAITING',     // can edit
        ACCEPTED: 'ACCEPTED',   // can view details (without buttons products or services)
        VERIFIED: 'VERIFIED',   // can view details, (with buttons)
        REJECTED: 'REJECTED',   // disabled
        INCOMPLETE: 'INCOMPLETE', // can edit
        DISABLED: 'DISABLED',    // can not show
        CLAIM: 'CLAIM'
    }
};


export const CLAIMS = {
    STATUS: {
        WAITING: 'WAITING',
        ACCEPTED: 'ACCEPTED',
        REJECTED: 'REJECTED'
    }
};



export const MAP_MODE = {
    SEARCH: 'search',
    FIND_BUSINESS: 'find-my-business',
    REGISTER_BUSINESS: 'register-business',
};
