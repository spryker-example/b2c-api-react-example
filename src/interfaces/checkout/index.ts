import { ICustomerProfileIdentity, } from '@interfaces/customer';
import { IAddressItem, IAddressItemCollection } from '@interfaces/addresses';
import { TCartId } from '@interfaces/cart';
import { TFormInputValue } from '@application/components/UI/SprykerForm/types';

export type TShipmentCarrierName = string;
export type TShipmentId = string;
export type TShipmentName = string;
export type TShipmentPrice = number;
export type TShipmentTaxRate = number | null;
export type TShipmentShipmentDeliveryTime = string | null;
export type TPaymentProvider = string;
export type TPaymentMethodName = string;

export interface ISameAsDelivery {
    isSameAsDelivery: boolean;
}

export interface IPaymentMethod {
    paymentProviderName: TPaymentProvider;
    paymentMethodName: TPaymentMethodName;
    requiredRequestData?: string[];
}

export interface IShipmentMethod {
    carrierName: TShipmentCarrierName;
    id: TShipmentId;
    name: TShipmentName;
    price: TShipmentPrice;
    taxRate: TShipmentTaxRate;
    shipmentDeliveryTime: TShipmentShipmentDeliveryTime;
}

export interface ICheckoutRequest {
    customer?: ICustomerProfileIdentity;
    idCart?: TCartId;
    billingAddress?: IAddressItem;
    shippingAddress?: IAddressItem;
    payments?: IPaymentMethod[];
    shipment?: {
        idShipmentMethod: number,
    };
}

export interface IUsageSavedAddress {
    billingSelectedAddressId: IAddressItem['id'] | null;
    deliverySelectedAddressId: IAddressItem['id'] | null;
}

export interface IAddNewAddressActions {
    isAddNewBilling: boolean;
    isAddNewDelivery: boolean;
}

export interface IPaymentProvider {
    paymentProviderName: TPaymentProvider;
    paymentMethods: IPaymentMethod[];
}

export interface IcheckoutResponse {
    addresses: IAddressItemCollection[] | {};
    paymentProviders: IPaymentProvider[];
    shipmentMethods: IShipmentMethod[];
}

export interface ICheckoutAddressState {
    firstName: IConfigInputState;
    lastName: IConfigInputState;
    salutation: IConfigInputState;
    address1: IConfigInputState;
    address2: IConfigInputState;
    address3: IConfigInputState;
    zipCode: IConfigInputState;
    city: IConfigInputState;
    country: IConfigInputState;
    company: IConfigInputState;
    phone: IConfigInputState;

    [key: string]: IConfigInputState;
}

export interface IDeliveryAddressState extends ICheckoutAddressState {
}

export interface IBillingAddressState extends ICheckoutAddressState {
}

export interface IConfigInputState {
    value: TFormInputValue;
    isError: boolean;
}

export interface IDeliverySelectionState {
    selectedAddressId: IUsageSavedAddress['deliverySelectedAddressId'];
    isAddNew: IAddNewAddressActions['isAddNewDelivery'];
}

export interface IBillingSelectionState {
    selectedAddressId: IUsageSavedAddress['billingSelectedAddressId'];
    isAddNew: IAddNewAddressActions['isAddNewBilling'];
    isSameAsDelivery: ISameAsDelivery['isSameAsDelivery'];
}

export interface ICheckoutStepsCompletionState {
    first: boolean;
    second: boolean;
    third: boolean;
    fourth: boolean;
}

export interface ICheckoutCreditCardState {
    paymentProvider: IConfigInputState;
    cardNumber: IConfigInputState;
    cardName: IConfigInputState;
    cardExpiryMonth: IConfigInputState;
    cardExpiryYear: IConfigInputState;
    cardCVC: IConfigInputState;

    [key: string]: IConfigInputState;
}

export interface ICheckoutInvoiceState {
    dateOfBirth: IConfigInputState;

    [key: string]: IConfigInputState;
}

export interface IFormFieldMutate {
    key: string;
    value: string | boolean;
    isError: boolean;
}

export interface IFormUpdatePaymentStatus {
    value: string;
    isFourthStepCompleted: boolean;
}
