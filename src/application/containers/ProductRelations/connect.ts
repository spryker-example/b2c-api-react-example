import { reduxify } from '@hoc/Reduxify';
import { push } from 'connected-react-router';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IProductRelationsState } from '@stores/reducers/common/productRelations/types';
import { getProductRelationsAction, getProductRelationsCartAction } from '@stores/actions/common/productRelations';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { getAnonymId, getAppCurrency } from '@stores/reducers/common/init/selectors';
import { TAppCurrency } from '@interfaces/currency';
import { isUserAuthenticated } from '@stores/reducers/pages/login';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const productRelationsState: IProductRelationsState = state.productRelations ? state.productRelations : null;
    const isLoading: boolean = productRelationsState.pending;
    const products: IProductRelationsItem[] = productRelationsState.data.products;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);

    return {
        isLoading,
        products,
        currency,
        isUserLoggedIn,
        anonymId
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    getProductRelations: (sku: string) => dispatch(getProductRelationsAction(sku)),
    getProductRelationsCart: (cartId: string, isUserLoggedIn: boolean, anonymId: string) =>
        dispatch(getProductRelationsCartAction(cartId, isUserLoggedIn, anonymId)),
    changeLocation: (location: string) => dispatch(push(location))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
