import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid } from '@material-ui/core';
import { AppMain } from '@application/components/AppMain';
import { CheckoutCart } from '@application/pages/CheckoutPage/CheckoutCart';
import { OrderSuccess } from '@application/pages/CheckoutPage/OrderSuccess';
import { AppPageTitle } from '@application/components/AppPageTitle';
import {
    getCheckoutPanelsSettings,
    getAddressForm
} from '@helpers/checkout';
import { FormEvent } from '@interfaces/common';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICheckoutRequest } from '@interfaces/checkout';
import {
    ICheckoutPageProps as Props,
    ICheckoutPageState as State
} from './types';
import { styles } from './styles';
import { AppPageSubTitle } from '@application/components/AppPageSubTitle';
import { CheckoutForms } from './CheckoutForms';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';

@connect
export class CheckoutPageBase extends React.Component<Props, State> {
    public readonly state: State = {
        isButtonDisabled: true
    };

    public componentDidMount = (): void => {
        if (this.props.isUserLoggedIn) {
            this.props.getCheckoutData({ idCart: this.props.cartId }, '');
        } else {
            this.props.getCheckoutData({ idCart: this.props.cartId }, this.props.anonymId);
        }
    }

    public componentDidUpdate = (prevProps: Props): void => {
        if (!prevProps.isCheckoutFulfilled && this.props.isCheckoutFulfilled) {
            if (!this.props.profile && this.props.isUserLoggedIn && this.props.customerReference) {
                this.props.getCustomerData(this.props.customerReference);
            }
        }

        const { first, second, third, fourth } = this.props.stepsCompletion;
        const {
            first: prevFirst,
            second: prevSecond,
            third: prevThird,
            fourth: prevFourth
        } = prevProps.stepsCompletion;
        const checkCheckoutFormValidity = first && second && third && fourth;
        const prevCheckCheckoutFormValidity = prevFirst && prevSecond && prevThird && prevFourth;
        const { isCheckoutLoading: previousStateLoading } = prevProps;
        const isShouldChangeButtonState = (prevCheckCheckoutFormValidity !== checkCheckoutFormValidity) ||
            previousStateLoading;

        if (isShouldChangeButtonState) {
            this.setState({ isButtonDisabled: !checkCheckoutFormValidity });
        }
    };

    protected handleSubmit = (event: FormEvent): void => {
        this.setState({ isButtonDisabled: true });
        event.preventDefault();
        const {
            addressesCollection,
            isUserLoggedIn,
            cartId,
            sendCheckoutData,
            profile,
            anonymId,
            deliverySelection,
            billingSelection,
            deliveryNewAddress,
            billingNewAddress,
            paymentMethod,
            shipmentMethod
        } = this.props;

        const payload: ICheckoutRequest = {};

        if (deliverySelection.isAddNew) {
            payload.shippingAddress = getAddressForm(deliveryNewAddress);
        } else {
            const shippingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.shippingAddress = { ...shippingAddress, country: '' };
        }

        if (billingSelection.isAddNew) {
            payload.billingAddress = getAddressForm(billingNewAddress);
        } else if (billingSelection.isSameAsDelivery) {
            payload.billingAddress = payload.shippingAddress;
        } else {
            const billingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.billingAddress = { ...billingAddress, country: '' };
        }

        payload.idCart = cartId;

        payload.payments = [ {
            paymentProviderName: 'DummyPayment',
            paymentMethodName: paymentMethod
        } ];

        payload.shipment = { idShipmentMethod: parseInt(shipmentMethod, 10) };
        const customerEmail = isUserLoggedIn ? profile.email : payload.shippingAddress.email;
        const customerSalutation = isUserLoggedIn ? profile.salutation : payload.shippingAddress.salutation;
        const customerFirstName = isUserLoggedIn ? profile.firstName : payload.shippingAddress.firstName;
        const customerLastName = isUserLoggedIn ? profile.lastName : payload.shippingAddress.lastName;
        const customerIdInspection = isUserLoggedIn ? '' : anonymId;

        payload.customer = {
            email: customerEmail,
            salutation: customerSalutation,
            firstName: customerFirstName,
            lastName: customerLastName
        };

        sendCheckoutData(payload, customerIdInspection);
    };

    public render(): JSX.Element {
        const {
            classes,
            isProductsExists,
            orderId,
            isUserLoggedIn,
            anonymId,
            stepsCompletion,
            isCheckoutLoading
        } = this.props;
        const { isButtonDisabled } = this.state;
        const panels = getCheckoutPanelsSettings(stepsCompletion);

        const CheckoutFormsView = isCheckoutLoading
            ? <AppPageSubTitle title={ <FormattedMessage id={ 'form.waiting.for.response.title' } /> } />
            : <CheckoutForms panels={ panels } />;

        return (
            <AppMain>
                { !isProductsExists && !orderId
                    ? <AppPageTitle title={ <FormattedMessage id={ 'no.products.in.checkout.title' } /> } />
                    : <Grid container className={ classes.container }>
                        <Grid item xs={ 12 } md={ 7 } className={ classes.leftColumn }>
                            { orderId
                                ? <OrderSuccess order={ orderId } />
                                : CheckoutFormsView
                            }
                        </Grid>
                        <Grid item xs={ 12 } md={ 5 } className={ classes.rightColumn }>
                            <ErrorBoundary>
                                <CheckoutCart
                                    isSendBtnDisabled={ isButtonDisabled }
                                    sendData={ this.handleSubmit }
                                    order={ orderId }
                                    isUserLoggedIn={ isUserLoggedIn }
                                    anonymId={ anonymId }
                                />
                            </ErrorBoundary>
                        </Grid>
                    </Grid>
                }
            </AppMain>
        );
    }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);
