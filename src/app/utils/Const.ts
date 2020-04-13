

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
        SERVICE: 'SERVICE'
    },
    STATUS: {
        WAITING: 'WAITING',     // can edit
        ACCEPTED: 'ACCEPTED',   // can view details (without buttons products or services)
        VERIFIED: 'VERIFIED',   // can view details, (with buttons)
        REJECTED: 'REJECTED',   // disabled
        INCOMPLETE: 'INCOMPLETE', // can edit
        DISABLED: 'DISABLED'    // can not show
    }
};


export const CATEGORY_ICONS = [
    { name: '001-comida' },
    { name: '001-fruta' },
    { name: '002-compras' },
    { name: '002-pizza' },
    { name: '003-hotel' },
    { name: '003-pan-de-molde' },
    { name: '004-dormir' },
    { name: '004-puesto-de-comida' },
    { name: '005-mujer' },
    { name: '005-tijeras' },
    { name: '006-gimnasio' },
    { name: '006-perfume' },
    { name: '007-piscina' },
    { name: '007-restaurante' },
    { name: '008-cabana-de-madera' },
    { name: '008-comida-1' },
    { name: '009-cabina-del-teleferico' },
    { name: '009-helado' },
];
