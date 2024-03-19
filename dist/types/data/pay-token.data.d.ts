import { BillingAddress, Customer, MerchantOrder, PaymentData, ReturnUrls, ShippingAddress } from './common.data';
type PayTokenPaymentData = Omit<PaymentData, 'preauth'>;
type PayTokenCustomer = Omit<Customer, 'phone'> & {
    locale?: string;
};
export type PayTokenData = {
    token: string;
    lastDigits: string;
    merchantName?: string;
    merchantOrder?: MerchantOrder;
    shippingAddress?: ShippingAddress;
    paymentMethod: string;
    paymentData: PayTokenPaymentData;
    billingAddress: BillingAddress;
    customer: PayTokenCustomer;
    returnUrls?: ReturnUrls;
};
export {};
