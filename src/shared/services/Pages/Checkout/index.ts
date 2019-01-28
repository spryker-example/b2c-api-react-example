import api, {setAuthToken} from 'src/shared/services/api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from 'src/shared/services/Common/RefreshToken/index';
import {ICheckoutRequest, IcheckoutResponse, IShipmentMethod, IPaymentMethod} from 'src/shared/interfaces/checkout';
import {
  getCheckoutDataInitPendingStateAction,
  getCheckoutDataInitRejectedStateAction,
  getCheckoutDataInitFulfilledStateAction,
  sendCheckoutDataPendingStateAction,
  sendCheckoutDataRejectedStateAction,
  sendCheckoutDataFulfilledStateAction,
} from '@stores/actions/pages/checkout';

import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import {ICheckoutResponseData} from "src/shared/stores/reducers/pages/checkout/types";
import {IApiResponseData} from "src/shared/services/types";

interface IRequestBody {
  data: {
    type: string;
    include?: string;
    attributes: ICheckoutRequest;
  };
}

export class CheckoutService extends ApiServiceAbstract {
  public static async getCheckoutData(dispatch: Function, payload: ICheckoutRequest, anonymId: string): Promise<void> {
    try {
      let headers: {withCredentials: boolean, headers?: {}};

      if (anonymId) {
        headers = {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}};
      } else {
        const token = await RefreshTokenService.getActualToken(dispatch);
        setAuthToken(token);
        headers = { withCredentials: true };
      }

      const body: IRequestBody = {
        data: {
          type: 'checkout-data',
          attributes: payload,
        }
      };

      dispatch(getCheckoutDataInitPendingStateAction());

      const response: IApiResponseData = await api.post('checkout-data', body, headers);

      if (response.ok) {
        const payload = CheckoutService.parseCheckoutData(response.data.data.attributes);
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

  public static async sendOrderData(dispatch: Function, payload: ICheckoutRequest, anonymId: string): Promise<void> {
    try {
      let headers: {withCredentials: boolean, headers?: {}};

      if (anonymId) {
        headers = {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}};
      } else {
        const token = await RefreshTokenService.getActualToken(dispatch);
        setAuthToken(token);
        headers = { withCredentials: true };
      }

      const body: IRequestBody = {
        data: {
          type: 'checkout',
          attributes: payload,
        }
      };

      dispatch(sendCheckoutDataPendingStateAction());

      const response: IApiResponseData = await api.post('checkout', body, headers);

      if (response.ok) {
        dispatch(sendCheckoutDataFulfilledStateAction(response.data.data.attributes.orderReference));
        toast.success('Order created successfully.');
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

  private static parseCheckoutData(data: IcheckoutResponse): ICheckoutResponseData {
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