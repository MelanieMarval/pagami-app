export interface MethodPayment {
    active: boolean;
    icon: string;
    id: string;
    name: string;

    bankAccount?: string;
    numberAccount?: string;
    typeAccount?: string;
}
