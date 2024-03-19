import { BillingAddress, Customer, MerchantOrder, PaymentData, ReturnUrls, Settings, ShippingAddress } from './common.data';
type PayFormCustomer = Omit<Customer, 'phone'> & {
    device?: {
        fingerprint?: string;
    };
    locale?: string;
};
export type PayFormData = {
    merchantOrder?: MerchantOrder;
    shippingAddress?: ShippingAddress;
    paymentMethod: string;
    paymentData: PaymentData;
    billingAddress: BillingAddress;
    customer: PayFormCustomer;
    returnUrls?: ReturnUrls;
    settings?: Settings;
};
export {};
