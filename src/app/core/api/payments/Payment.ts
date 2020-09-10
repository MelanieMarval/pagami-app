
export interface Payment {
    id?: string;
    photo?: string;
    amount?: number;
    date?: any;
    note?: string;
    placeId: string;
    planId: string;
    type?: string;
    typeCurrency?: string;

    createTime?: string;
}
