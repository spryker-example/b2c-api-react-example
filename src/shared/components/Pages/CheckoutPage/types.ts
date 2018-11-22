import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem, ICartTotals} from "src/shared/interfaces/cart";
import {TCustomerReference} from "src/shared/interfaces/customer/index";
import {
  IAddNewAddressActions,
  ISameAsDelivery,
  IUsageSavedAddress,
  ICheckoutRequest,
  IShipmentMethod,
  IPaymentMethod,
} from "src/shared/interfaces/checkout";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {IRadioItem, TFormInputValue} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";
import {
  IAddressesSelections,
  ICurrentValuesInSelections,
  IExtraAddressesOptions
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IMenuItemSelect} from "src/shared/components/UI/SprykerSelect/types";

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isInitiated: boolean;

  products: Array<ICartItem> | null;
  totals: ICartTotals;
  isCartFulfilled: boolean;
  isCartRejected: boolean;
  isCartLoading: boolean;
  isAddressesCollectionExist: boolean;
  getAddressesList: (customerRef: TCustomerReference) => void;
  customerReference: TCustomerReference | null;
  currentAddress: IAddressItem | null;
  addressesCollection: IAddressItem[] | null;
  isAddressesLoading: boolean;
  isAddressesFulfilled: boolean;

  isAppStateLoading: boolean;
  countriesCollection: ICountries[];
  shipmentMethods: Array<IShipmentMethod> | null;
  paymentMethods: Array<IPaymentMethod> | null;
  getCheckoutData: (payload: ICheckoutRequest) => void;
  sendCheckoutData: (payload: ICheckoutRequest) => void;
}

export interface ICheckoutPageState {
  deliverySelection: IDeliverySelection;
  billingSelection: IBillingSelection;
  deliveryNewAddress: IDeliveryAddressState;
  billingNewAddress: IBillingAddressState;
  stepsCompletion: ICheckoutStepsCompletion;
  shipmentMethod: IShipmentMethod["id"] | null;
  paymentMethod: IPaymentMethod["paymentMethod"] | null;
  paymentCreditCardData: ICheckoutCreditCardState;
  paymentInvoiceData: ICheckoutInvoiceState;
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

export interface IObjectConfigInputStable {
  firstName: IConfigInputStable;
  lastName: IConfigInputStable;
  salutation: IConfigInputStable;
  address1: IConfigInputStable;
  address2: IConfigInputStable;
  address3: IConfigInputStable;
  zipCode: IConfigInputStable;
  city: IConfigInputStable;
  country: IConfigInputStable;
  company: IConfigInputStable;
  phone: IConfigInputStable;

  [key: string]: IConfigInputStable;
}

export interface IDeliveryAddressState extends ICheckoutAddressState {}

export interface IBillingAddressState extends ICheckoutAddressState {}

export interface IDeliveryObjectConfigInputStable extends IObjectConfigInputStable {}

export interface IBillingObjectConfigInputStable extends IObjectConfigInputStable {}

export interface IConfigInputStable {
  isRequired: boolean;
  inputName: string;
}

export interface IConfigInputState {
  value: TFormInputValue;
  isError: boolean;
}

export const isAddNewDeliveryValue = "isAddNewDelivery";
export type TIsAddNewDeliveryValue = "isAddNewDelivery";
export const isAddNewBillingValue = "isAddNewBilling";
export type TIsAddNewBillingValue = "isAddNewBilling";
export const isSameAsDeliveryValue = "isSameAsDelivery";
export type TIsSameAsDeliveryValue = "isSameAsDelivery";

export interface IDeliverySelection {
  selectedAddressId: IUsageSavedAddress["deliverySelectedAddressId"];
  isAddNew: IAddNewAddressActions["isAddNewDelivery"];
}

export interface IBillingSelection {
  selectedAddressId: IUsageSavedAddress["billingSelectedAddressId"];
  isAddNew: IAddNewAddressActions["isAddNewBilling"];
  isSameAsDelivery: ISameAsDelivery["isSameAsDelivery"];
}

export interface ICheckoutStepsCompletion {
  first: boolean;
  second: boolean;
  third: boolean;
  fourth: boolean;
}

// Type for Context Provider of the Checkout Page
export type TCheckoutPageContext = {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  onBlurHandler: (formName: string) => React.EventHandler<any>;
  selectionsChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleDeliveryInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleBillingInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleInvoiceInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleCreditCardInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  isBillingSameAsDelivery: boolean;
  deliveryNewAddress: IDeliveryAddressState;
  billingNewAddress: IBillingAddressState;
  addressesCollection: IAddressItem[] | null;
  countriesCollection: ICountries[] | null;
  selections: IAddressesSelections | null;
  currentValuesInSelections: ICurrentValuesInSelections;
  isAddressesFulfilled: boolean;
  extraAddressesOptions: IExtraAddressesOptions | null;
  isUserLoggedIn: boolean;
  shipmentMethods: Array<IShipmentMethod> | null;
  currentValueShipmentMethod: IShipmentMethod["id"] | null;
  paymentMethods: Array<IPaymentMethod> | null;
  currentValuePaymentMethod: IPaymentMethod["paymentMethod"] | null;
  paymentCreditCardDataInputs: ICheckoutCreditCardState;
  paymentInvoiceDataInputs: ICheckoutInvoiceState;
};

export interface IParamInputValidity {
  value: TFormInputValue;
  fieldConfig: IConfigInputStable;
}

export interface IParamFormValidity {
  form: IDeliveryAddressState | IBillingAddressState | ICheckoutInvoiceState | ICheckoutCreditCardState;
  fieldsConfig: IDeliveryObjectConfigInputStable
                | IBillingObjectConfigInputStable
                | IInvoiceObjectConfigInputStable
                | ICreditCardObjectConfigInputStable;
}

export interface ICheckoutPanelsSettings {
  isFirstPanelDisabled: boolean;
  isSecondPanelDisabled: boolean;
  isThirdPanelDisabled: boolean;
  isFourthPanelDisabled: boolean;
}

export interface IShipmentMethodsGrouped {
  [key: string]: Array<IShipmentMethod>;
}

export interface IPaymentMethodsGrouped {
  [key: string]: Array<IPaymentMethod>;
}

export interface IPaymentMethodGroupItem extends IRadioItem {}

export interface ICheckoutInputsFormNames {
  billing: string;
  delivery: string;
  invoice: string;
  creditCard: string;
}

export interface ICheckoutPaymentMethodsNames {
  invoice: string;
  creditCard: string;
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

export interface ICreditCardObjectConfigInputStable {
  paymentProvider: IConfigInputStable;
  cardNumber: IConfigInputStable;
  cardName: IConfigInputStable;
  cardExpiryMonth: IConfigInputStable;
  cardExpiryYear: IConfigInputStable;
  cardCVC: IConfigInputStable;

  [key: string]: IConfigInputStable;
}

export interface IInvoiceObjectConfigInputStable {
  dateOfBirth: IConfigInputStable;

  [key: string]: IConfigInputStable;
}

export type TPaymentProvidersCollection = Array<IMenuItemSelect>;
