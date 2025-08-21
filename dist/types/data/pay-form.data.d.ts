import { BillingAddress, Customer, MerchantOrder, PaymentData, ReturnUrls, ShippingAddress } from './common.data';
type PayFormCustomer = Omit<Customer, 'phone'> & {
    locale?: string;
    id?: string;
    fullName?: string;
    phone?: string;
};
type InstallmentItem = {
    quantity: number;
    amount: number;
};
type PayFormPaymentData = PaymentData & {
    installmentType?: 'MF_HOLD' | 'IF';
    installments?: InstallmentItem[];
    holdPeriod?: number;
    postAuthStatus?: 'Reverse' | 'Complete';
};
export type PayFormData = {
    merchantOrder?: MerchantOrder;
    shippingAddress?: ShippingAddress;
    paymentMethod: string;
    paymentData: PayFormPaymentData;
    billingAddress?: BillingAddress;
    customer: PayFormCustomer;
    returnUrls?: ReturnUrls;
};
export {};
