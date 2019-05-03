import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@hoc/ProtectedRoute';
import { LoadableHomePage } from '@pages/HomePage/loadable';
import { LoadableSearchPage } from '@pages/SearchPage/loadable';
import { LoadableProductPage } from '@pages/ProductPage/loadable';
import { LoadableLoginPage } from '@pages/LoginPage/loadable';
import { LoadableRegisterPage } from '@pages/RegisterPage/loadable';
import { LoadableCartPage } from '@pages/CartPage/loadable';
import { LoadableCustomerPage } from '@pages/CustomerPage/loadable';
import { LoadablePasswordForgotPage } from '@pages/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '@pages/ResetPasswordPage/loadable';
import { LoadableWishlistPage } from '@pages/WishlistPage/loadable';
import { LoadableWishlistDetail } from '@pages/WishlistDetail/loadable';
import { LoadableCheckoutPage } from '@pages/CheckoutPage/loadable';
import { LoadableOrderDetailsPage } from '@pages/OrderDetailsPage/loadable';
import { CustomerAddressForm } from '@pages/CustomerAddressForm';
import { LoadableNotFound } from '@pages/NotFound/loadable';
import {
    pathAddressFormUpdate,
    pathCartPage,
    pathCategoryPage,
    pathCheckoutPage,
    pathCustomerPage,
    pathForgotPassword,
    pathHomePage,
    pathLoginPage,
    pathNotFoundPage,
    pathOrderDetailsPage,
    pathProductPage,
    pathResetPassword,
    pathSearchPage,
    pathWishlistDetailPage,
    pathWishlistsPage,
    pathRegisterPage,
} from '@constants/routes';
import { RoutesProps as Props } from './types';
import { Preloader } from '@components/Preloader';

export const Routes: React.SFC<Props> = (props): JSX.Element => {
    const { isAppLoading } = props;

    if (!isAppLoading) {
        return <Preloader />;
    }

    return (
        <Switch>
            <Route path={ pathHomePage } exact component={  LoadableHomePage }/>
            <Route path={ pathCategoryPage } exact component={  LoadableSearchPage }/>
            <Route path={ pathSearchPage } exact component={  LoadableSearchPage }/>
            <Route path={ pathProductPage } exact component={  LoadableProductPage }/>
            <Route path={ pathLoginPage } exact component={  LoadableLoginPage }/>
            <Route path={ pathRegisterPage } exact component={  LoadableRegisterPage }/>
            <Route path={ pathCartPage } exact component={  LoadableCartPage }/>
            <ProtectedRoute path={ pathCustomerPage } component={  LoadableCustomerPage }/>
            <Route path={ pathForgotPassword } exact component={  LoadablePasswordForgotPage }/>
            <Route path={ `${pathResetPassword}/:restoreKey` } exact component={  LoadablePasswordResetPage } />
            <ProtectedRoute path={ pathWishlistsPage } exact component={  LoadableWishlistPage } />
            <ProtectedRoute path={ pathWishlistDetailPage } exact component={  LoadableWishlistDetail } />
            <Route path={ pathCheckoutPage } component={  LoadableCheckoutPage }/>
            <Route path={ pathOrderDetailsPage } exact component={  LoadableOrderDetailsPage }/>
            <Route path={ pathAddressFormUpdate } exact component={  CustomerAddressForm }/>
            <Route path={ pathNotFoundPage } exact component={  LoadableNotFound }/>
        </Switch>
    );
};
