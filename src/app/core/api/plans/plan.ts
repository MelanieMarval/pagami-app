export interface Plan {
    active: boolean;
    amount: number;
    amountCop: number;
    stars: number;
    details: string[];
    id: string;
    name: string;
    days: number;
    remainDays?: number;
    prompText: string;
}
