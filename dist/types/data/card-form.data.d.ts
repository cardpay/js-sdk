import { BillingAddress, Customer, MerchantOrder, PaymentData, ReturnUrls } from '../data/common.data';
type CardFormMerchantOrder = Partial<Pick<MerchantOrder, 'id' | 'description'>>;
type CardFormCustomer = Customer & {
    id: string;
    ip?: string;
    locale?: string;
    phone?: string;
};
type CardFormPaymentData = Pick<PaymentData, 'currency'> & {
    generateToken?: boolean;
};
export type CardFormData = {
    merchantOrder?: CardFormMerchantOrder;
    recurringCurrency?: string;
    billingAddress?: BillingAddress;
    customer: CardFormCustomer;
    returnUrls?: ReturnUrls;
    paymentData?: CardFormPaymentData;
};
export {};
