export type MerchantOrderItem = {
    name: string;
    description?: string;
    count?: number;
    price?: number;
};
export type MerchantOrder = {
    id: string;
    description: string;
    items: MerchantOrderItem[];
};
export type PaymentData = {
    amount: number;
    currency: number;
    preauth?: boolean;
    note?: string;
    dynamicDescriptor?: string;
    transType?: string;
};
export type BillingAddress = {
    country: string;
    state?: string;
    zip: string;
    city: string;
    addrLine1: string;
    addrLine2?: string;
};
export type Customer = {
    email: string;
    phone?: string;
    homePhone?: string;
    workPhone?: string;
    device?: {
        fingerprint?: string;
    };
};
export type ShippingAddress = {
    country: string;
    state?: string;
    zip?: string;
    city?: string;
    phone?: string;
    addrLine1?: string;
    addrLine2?: string;
};
export type ReturnUrls = {
    returnUrl?: string;
    successUrl?: string;
    declineUrl?: string;
    cancelUrl?: string;
    inprocessUrl?: string;
};
export type Settings = {
    cardholder?: {
        required: boolean;
    };
};
