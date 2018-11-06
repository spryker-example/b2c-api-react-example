import {
  PAGES_CUSTOMER_REGISTER,
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_LOGOUT,
  REFRESH_TOKEN_REQUEST,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../../constants/ActionTypes/Pages/Login';
import {
  SET_AUTH_FROM_STORAGE,
} from '../../constants/ActionTypes/Common/Init';
import {
  IReduxState,
} from '../../../typings/app';
import {TAccessToken} from "../../interfaces/login/index";
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {TCustomerEmail, TCustomerReference, TCustomerUsername} from "../../interfaces/customer/index";
import {LOGIN_DATA_SET_TO_STORE} from "../../constants/ActionTypes/Pages/CustomerProfile";

export interface ILoginState extends IReduxState {
  data: {
    customerRef?: string,
    isAuth?: boolean,
    tokenType?: string,
    expiresIn?: string,
    accessToken?: TAccessToken,
    refreshToken?: string,
    customerUsername: TCustomerUsername | TCustomerEmail,
  };
}

export const initialState: ILoginState = {
  data: {
    customerRef: '',
    isAuth: false,
    tokenType: '',
    expiresIn: '',
    accessToken: '',
    refreshToken: '',
    customerUsername: '',
  },
};

export const pagesLogin = function (state: ILoginState = initialState, action: any): ILoginState {
  switch (action.type) {
    case `${PAGES_CUSTOMER_REGISTER}_PENDING`:
    case `${REFRESH_TOKEN_REQUEST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${PAGES_CUSTOMER_REGISTER}_FULFILLED`:
      return {
        ...state,
        ...getReducerPartFulfilled(),
      };
    case `${PAGES_CUSTOMER_REGISTER}_REJECTED`:
    case `${PAGES_LOGIN_REQUEST}_REJECTED`:
    case `${REFRESH_TOKEN_REQUEST}_REJECTED`:
    case `${FORGOT_PASSWORD}_REJECTED`:
    case `${RESET_PASSWORD}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${PAGES_LOGIN_REQUEST}_PENDING`:
    case `${FORGOT_PASSWORD}_PENDING`:
    case `${RESET_PASSWORD}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${PAGES_LOGIN_REQUEST}_FULFILLED`:
    case `${REFRESH_TOKEN_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          isAuth: true,
          ...action.payload,
        },
        ...getReducerPartFulfilled(),
      };
    case `${LOGIN_DATA_SET_TO_STORE}_FULFILLED`:
      const customerUsername = action.payload.email ? action.payload.email : null;
      return {
        ...state,
        data: {
          ...state.data,
          customerUsername,
        },
      };
    case `${SET_AUTH_FROM_STORAGE}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          isAuth: true,
          ...action.payload,
        },
      };
    case PAGES_CUSTOMER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        data: initialState.data
      };
    case `${FORGOT_PASSWORD}_FULFILLED`:
    case `${RESET_PASSWORD}_FULFILLED`:
      return {
        ...state,
        ...getReducerPartFulfilled(),
      };
    default:
      return state;
  }
};

// selectors

export function isUserAuthenticated(state: any, props: any): boolean {
  return (state.pagesLogin && state.pagesLogin.data && state.pagesLogin.data.isAuth);
}

export function getAccessToken(state: any, props: any): TAccessToken | null {
  return (
    isUserAuthenticated(state, props) && state.pagesLogin.data.accessToken
    ? state.pagesLogin.data.accessToken
    : null
  );
}

export function getLoginCustomer(state: any, props: any): any | null {
  return (
    isUserAuthenticated(state, props) && state.pagesLogin.data && state.pagesLogin.data.customer
      ? state.pagesLogin.data.customer
      : null
  );
}

export function getCustomerReference(state: any, props: any): TCustomerReference | null {
  return (
    isUserAuthenticated(state, props) && state.pagesLogin.data.customerRef
      ? state.pagesLogin.data.customerRef
      : null
  );
}

export function getCustomerUsername(state: any, props: any): TCustomerUsername | TCustomerEmail | null {

  if (!isStateExist(state, props) || !isUserAuthenticated(state, props)) {
    return null;
  } else if (state.pagesLogin.data && state.pagesLogin.data.customerUsername) {
    return state.pagesLogin.data.customerUsername;
  } else {
    const customerUsername = localStorage.getItem('customerUsername');
    if (!customerUsername) {
      return null;
    }
    return customerUsername;
  }
}

export function isPageLoginStateLoading(state: any, props: any): boolean {
  return (state.pagesLogin && state.pagesLogin.pending && state.pagesLogin.pending === true);
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pagesLogin);
}
