import api from '../../api';
import { toast } from 'react-toastify';
import { ICartAddItem, TCartId } from 'src/shared/interfaces/cart';
import { parseGuestCartResponse } from 'src/shared/helpers/cart';
import { ApiServiceAbstract } from '../../apiAbstractions/ApiServiceAbstract';
import * as cartActions from 'src/shared/actions/Common/Cart';
import { cartAddProducts, cartChangeQty, cartRemoveItems } from 'src/shared/constants/messages/cart';

export class GuestCartService extends ApiServiceAbstract {
  public static async guestCartAddItem(dispatch: Function, payload: ICartAddItem, anonymId: string): Promise<any> {
    try {
      dispatch(cartActions.cartAddItemPendingStateAction());

      const body = {
        data: {
          type: 'guest-cart-items',
          attributes: payload,
        },
      };

      const response: any = await api.post(
        'guest-cart-items',
        body,
        {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}},
      );

      if (response.ok) {
        toast.success(cartAddProducts);
        const responseParsed = parseGuestCartResponse(response.data);
        dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        return this.errorMessageInform(response, dispatch);
      }

    } catch (error) {
      dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async getGuestCart(dispatch: Function, anonymId: string): Promise<any> {
    try {
      dispatch(cartActions.getCartsPendingStateAction());

      const response: any = await api.get(
        '/guest-carts', {},
        {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}},
      );

      if (response.ok) {
        if (!response.data.data.length) {
          dispatch(cartActions.getCartsFulfilledStateAction(null));
          return null;
        }

        const responseParsed = parseGuestCartResponse({
          data: response.data.data[0],
          included: response.data.included,
        });
        dispatch(cartActions.getCartsFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        return this.errorMessageInform(response, dispatch);
      }

    } catch (err) {
      dispatch(cartActions.getCartsRejectedStateAction(err.message));
      toast.error('Unexpected Error: ' + err.message);
      return null;
    }
  }

  public static async guestCartRemoveItem(
    dispatch: Function, cartUid: string, sku: string, anonymId: string,
  ): Promise<any> {
    try {
      dispatch(cartActions.cartDeleteItemPendingStateAction);

      const response: any = await api.delete(
        `guest-carts/${cartUid}/guest-cart-items/${sku}`,
        {},
        {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}},
      );

      if (response.ok) {
        toast.success(cartRemoveItems);
        return GuestCartService.getGuestCart(dispatch, anonymId);
      } else {
        return this.errorMessageInform(response, dispatch);
      }

    } catch (error) {
      dispatch(cartActions.getCartsRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async guestCartUpdate(
    dispatch: Function, payload: ICartAddItem, cartId: TCartId, anonymId: string,
  ): Promise<any> {
    try {
      dispatch(cartActions.cartUpdateItemPendingStateAction());

      const body = {
        data: {
          type: 'guest-cart-items',
          attributes: payload,
        },
      };
      const {sku} = payload;
      const response: any = await api.patch(
        `guest-carts/${cartId}/guest-cart-items/${sku}`,
        body,
        {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}},
      );

      if (response.ok) {
        toast.success(cartChangeQty);
        const responseParsed = parseGuestCartResponse(response.data);
        dispatch(cartActions.cartUpdateItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        return this.errorMessageInform(response, dispatch);
      }

    } catch (error) {
      dispatch(cartActions.cartUpdateItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  private static errorMessageInform(response: any, dispatch: Function) {
    const errorMessage = this.getParsedAPIError(response);
    dispatch(cartActions.cartAddItemRejectedStateAction(errorMessage));
    toast.error('Request Error: ' + errorMessage);
    return errorMessage || null;
  }
}
