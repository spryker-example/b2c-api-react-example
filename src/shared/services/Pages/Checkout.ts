import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {ICheckoutRequest, IcheckoutResponse, IShipmentMethod, IPaymentMethod} from 'src/shared/interfaces/checkout';
import {
  getCheckoutDataInitPendingStateAction,
  getCheckoutDataInitRejectedStateAction,
  getCheckoutDataInitFulfilledStateAction,
  sendCheckoutDataPendingStateAction,
  sendCheckoutDataRejectedStateAction,
  sendCheckoutDataFulfilledStateAction,
} from 'src/shared/actions/Pages/Checkout';

import { ApiServiceAbstract } from '../apiAbstractions/ApiServiceAbstract';

interface IRequestBody {
  data: {
    type: string;
    include?: string;
    attributes: ICheckoutRequest;
  };
}

export class CheckoutService extends ApiServiceAbstract {
  public static async getCheckoutData(dispatch: Function, payload: ICheckoutRequest): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: IRequestBody = {
        data: {
          type: 'checkout-data',
          attributes: payload,
        }
      };

      dispatch(getCheckoutDataInitPendingStateAction());

      const response: any = await api.post('checkout-data', body, { withCredentials: true });

      if (response.ok) {
        const payload = CheckoutService.parseCheckoutData(response.data.data.attributes);

        const customerRef: string = localStorage.getItem('customerRef');

        dispatch(getCheckoutDataInitFulfilledStateAction(payload));
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(getCheckoutDataInitRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch(getCheckoutDataInitRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async sendOrderData(dispatch: Function, payload: ICheckoutRequest): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: IRequestBody = {
        data: {
          type: 'checkout',
          attributes: payload,
        }
      };

      dispatch(sendCheckoutDataPendingStateAction());

      const response: any = await api.post('checkout', body, { withCredentials: true });

      if (response.ok) {
        dispatch(sendCheckoutDataFulfilledStateAction({order: 'DE'}));
        toast.success('Order created successfull');
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(sendCheckoutDataRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch(sendCheckoutDataRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  private static parseCheckoutData(data: IcheckoutResponse) {
    let payments: IPaymentMethod[] = [];

    Array.isArray(data.paymentProviders) && data.paymentProviders.forEach(provider => {
      provider.paymentMethods.forEach(paymentMethod => {
        payments.push({
          ...paymentMethod,
          paymentProviderName: provider.paymentProviderName,
        });
      });
    });

    return ({
      payments,
      shipments: data.shipmentMethods.map((method: IShipmentMethod) => ({...method, id: method.id.toString()})),
      addressesCollection: Array.isArray(data.addresses) ? data.addresses : [],
    });
  }
}
