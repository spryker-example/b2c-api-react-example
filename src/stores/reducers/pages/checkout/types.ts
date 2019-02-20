import { IAddressItemCollection } from '@interfaces/addresses';
import { IActionData, IReduxState } from '@stores/reducers/types';
import { TOrderId } from '@interfaces/order';
import {
    IPaymentMethod,
    IShipmentMethod,
    IBillingAddressState,
    IBillingSelectionState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    ICheckoutStepsCompletionState,
    IDeliveryAddressState,
    IDeliverySelectionState,
    IFormUpdatePaymentStatus,
    IFormFieldMutate
} from '@interfaces/checkout';

export interface ICheckoutState extends IReduxState {
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: IDeliveryAddressState;
    billingNewAddress: IBillingAddressState;
    stepsCompletion: ICheckoutStepsCompletionState;
    shipmentMethod: IShipmentMethod['id'] | null;
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
    data: ICheckoutStateData;
}

export interface IPageCheckoutAction extends IActionData {
    payloadSendFulfilled?: {
        orderId: TOrderId;
    };
    payloadGetFulfilled?: ICheckoutResponseData;
    payloadFormFieldMutate?: IFormFieldMutate;
    payloadCurrentSelection?: string;
    payloadFormUpdatePaymentStatus?: IFormUpdatePaymentStatus;
    payloadUpdateSectionStatus?: boolean;
}

export interface ICheckoutResponseData {
    payments: IPaymentMethod[];
    shipments: IShipmentMethod[];
    addressesCollection: IAddressItemCollection[];
}

export interface ICheckoutStateData extends ICheckoutResponseData {
    orderId: TOrderId;
}
