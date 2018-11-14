import api, { setAuthToken } from '../api';
import { toast } from 'react-toastify';
import { TProductSKU } from 'src/shared/interfaces/product';
import { ICartAddItem, TCartAddItemCollection, TCartId } from 'src/shared/interfaces/cart';
import { parseAddToCartResponse, parseCartCreateResponse, parseGuestCartResponse } from 'src/shared/helpers/cart';
import { RefreshTokenService } from './RefreshToken';
import {
  cartAddItemFulfilledStateAction,
  cartAddItemPendingStateAction,
  cartAddItemRejectedStateAction,
  cartCreateFulfilledStateAction,
  cartCreatePendingStateAction,
  cartCreateRejectedStateAction,
  cartDeleteItemPendingStateAction,
  cartUpdateItemFulfilledStateAction,
  cartUpdateItemPendingStateAction,
  cartUpdateItemRejectedStateAction,
  getCartsFulfilledStateAction,
  getCartsPendingStateAction,
  getCartsRejectedStateAction,
} from 'src/shared/actions/Common/Cart';
import { cartAuthenticateErrorText } from 'src/shared/constants/messages/errors';

export interface ICartCreatePayload {
  priceMode: string;
  currency: string;
  store: string;
}

export class CartService {

  public static async getCustomerCarts(dispatch: Function): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);

      if (!token) {
        throw new Error(cartAuthenticateErrorText);
      }

      dispatch(getCartsPendingStateAction());
      setAuthToken(token);
      const response: any = await api.get('/carts', {}, {withCredentials: true});

      if (response.ok) {
        if (!response.data.data[0].id) {
          return null;
        }

        const responseParsed = parseAddToCartResponse({
          data: response.data.data[0],
          included: response.data.included,
        });
        dispatch(getCartsFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        dispatch(getCartsRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }
    } catch (err) {
      dispatch(getCartsRejectedStateAction(err.message));
      toast.error('Request Error: ' + err.message);
      return null;
    }
  }

  public static async cartCreate(dispatch: Function, payload: ICartCreatePayload): Promise<any> {
    try {
      dispatch(cartCreatePendingStateAction());

      const body = {
        data: {
          type: 'carts',
          attributes: payload,
        },
      };

      let response: any;
      const token = await RefreshTokenService.getActualToken(dispatch);

      if (!token) {
        throw new Error(cartAuthenticateErrorText);
      }

      setAuthToken(token);
      response = await api.post('carts', body, {withCredentials: true});

      if (response.ok) {
        const responseParsed = parseCartCreateResponse(response.data);
        dispatch(cartCreateFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        dispatch(cartCreateRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartCreateRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  // Adds an item to the cart.
  public static async cartAddItem(dispatch: Function, payload: ICartAddItem, cartId: TCartId): Promise<any> {
    try {
      dispatch(cartAddItemPendingStateAction());

      const body = {
        data: {
          type: 'items',
          attributes: payload,
        },
      };

      let response: any;

      const endpoint = `carts/${cartId}/items`;
      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) {
        throw new Error(cartAuthenticateErrorText);
      }
      setAuthToken(token);
      response = await api.post(endpoint, body, {withCredentials: true});

      console.info('cartAddItem response: ', response);

      if (response.ok) {
        const responseParsed = parseAddToCartResponse(response.data);
        console.info('cartAddItem responseParsed: ', responseParsed);
        dispatch(cartAddItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(cartAddItemRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async createCartAndAddItem(dispatch: Function, payload: ICartCreatePayload, item: ICartAddItem) {
    const cartId = await CartService.cartCreate(dispatch, payload);

    if (cartId) {
      await CartService.cartAddItem(dispatch, item, cartId);
    }
  }

  public static async guestCartAddItem(dispatch: Function, payload: ICartAddItem, anonymId: string): Promise<any> {
    try {
      dispatch(cartAddItemPendingStateAction());

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
        const responseParsed = parseGuestCartResponse(response.data);
        dispatch(cartAddItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(cartAddItemRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async getGuestCart(dispatch: Function, anonymId: string): Promise<any> {
    try {
      dispatch(getCartsPendingStateAction());

      const response: any = await api.get(
        '/guest-carts', {},
        {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}},
      );

      if (response.ok) {
        if (!response.data.data.length) {
          dispatch(getCartsFulfilledStateAction(null));
          return null;
        }

        const responseParsed = parseGuestCartResponse({
          data: response.data.data[0],
          included: response.data.included,
        });
        dispatch(getCartsFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        dispatch(getCartsRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }
    } catch (err) {
      dispatch(getCartsRejectedStateAction(err.message));
      toast.error('Unexpected Error: ' + err.message);
      return null;
    }
  }

  public static async guestCartRemoveItem(
    dispatch: Function, cartUid: string, sku: string, anonymId: string,
  ): Promise<any> {
    try {
      dispatch(cartDeleteItemPendingStateAction);

      const response: any = await api.delete(
        `guest-carts/${cartUid}/guest-cart-items/${sku}`,
        {},
        {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}},
      );

      if (response.ok) {
        return CartService.getGuestCart(dispatch, anonymId);
      } else {
        dispatch(getCartsRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(getCartsRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async guestCartUpdate(
    dispatch: Function, payload: ICartAddItem, cartId: TCartId, anonymId: string,
  ): Promise<any> {
    try {
      dispatch(cartUpdateItemPendingStateAction());

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
        const responseParsed = parseGuestCartResponse(response.data);
        dispatch(cartUpdateItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(cartUpdateItemRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartUpdateItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async cartDeleteItem(
    ACTION_TYPE: string, dispatch: Function, cartId: TCartId, itemId: TProductSKU,
  ): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);
      const response: any = await api.delete(`carts/${cartId}/items/${itemId}`, {}, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          itemId,
        });

        const newCartResponse: any = await api.get(`carts/${cartId}`);

        if (newCartResponse.ok) {
          const responseParsed = parseAddToCartResponse(newCartResponse.data);
          dispatch(cartAddItemFulfilledStateAction(responseParsed));
        } else {
          dispatch({
            type: ACTION_TYPE + '_REJECTED',
            error: newCartResponse.problem,
          });
        }

        return response.ok;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Delete item catch:', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error: error.message,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  // Update cart item quantity.
  public static async cartUpdateItem(
    dispatch: Function,
    payload: ICartAddItem,
    cartId: TCartId | null,
  ): Promise<any> {
    try {
      dispatch(cartUpdateItemPendingStateAction());

      const body = {
        data: {
          type: 'items',
          attributes: payload,
        },
      };
      const {sku} = payload;
      let response: any;

      try {
        const endpoint = `carts/${cartId}/items/${sku}`;
        const token = await RefreshTokenService.getActualToken(dispatch);
        if (!token) {
          throw new Error(cartAuthenticateErrorText);
        }
        setAuthToken(token);
        response = await api.patch(endpoint, body, {withCredentials: true});
      } catch (err) {
        console.error('CartService: cartUpdateItem: err', err);
      }

      console.info('cartUpdateItem response: ', response);

      if (response.ok) {
        const responseParsed = parseAddToCartResponse(response.data);
        console.info('cartUpdateItem responseParsed: ', responseParsed);
        dispatch(cartUpdateItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(cartUpdateItemRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartUpdateItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async moveItemstoCart(
    dispatch: Function,
    cartId: TCartId | null,
    payloadCartCreate: ICartCreatePayload,
    productsList: string[]
  ): Promise<any> {

    try {
      const id = cartId || await CartService.cartCreate(dispatch, payloadCartCreate);
      const endpoint = `carts/${id}/items?include=`;
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const requests: Array<Promise<any>> = [];

      productsList.forEach((sku: string) => {
        const body = {
          data: {
            type: 'items',
            attributes: {
              sku,
              quantity: 1,
            },
          },
        };

        const req = api.post(endpoint, body, {withCredentials: true});
        requests.push(req);
      });

      await Promise.all(requests);

    } catch (err) {
      dispatch(cartAddItemRejectedStateAction(err.message));
      toast.error('Unexpected Error: ' + err.message);
      return null;
    }
  }

  // Adds multiple items to the cart.
  public static async cartMultipleItems(
    dispatch: Function,
    payload: TCartAddItemCollection,
    cartId: TCartId | null,
    payloadCartCreate: ICartCreatePayload
  ): Promise<any> {
    if (!payload) {
      return false;
    }
    try {
      // Create cart if not exist
      if (!cartId) {
        try {
          cartId = await CartService.cartCreate(dispatch, payloadCartCreate);
        } catch (err) {
          console.error('await CartService.cartCreate err', err);
        }
      }

      // Global response
      let globalResponse: boolean = true;

      for (const item of payload) {
        if (!globalResponse) {
          dispatch(cartAddItemRejectedStateAction('Error in processing adding products in sequence'));
          return false;
        }
        dispatch(cartAddItemPendingStateAction());
        const processResult = await this.addingItemProcess(dispatch, item, cartId);
        if (processResult.ok) {
          const responseParsed = parseAddToCartResponse(processResult.data);
          dispatch(cartAddItemFulfilledStateAction(responseParsed));
          globalResponse = true;
        } else {
          dispatch(cartAddItemRejectedStateAction(processResult.problem));
          toast.error('Request Error: ' + processResult.problem);
          globalResponse = false;
        }
      }
      return globalResponse;
    } catch (error) {
      dispatch(cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  private static async addingItemProcess(
    dispatch: Function,
    payload: ICartAddItem,
    cartId: TCartId
  ): Promise<any> {
    const body = {
      data: {
        type: 'items',
        attributes: payload,
      },
    };

    let response: any;

    try {
      const endpoint = `carts/${cartId}/items`;
      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) {
        throw new Error(cartAuthenticateErrorText);
      }
      setAuthToken(token);
      response = await api.post(endpoint, body, {withCredentials: true});
    } catch (err) {
      console.error('CartService: cartAddItem: err', err);
    }
    return response;
  }
}
