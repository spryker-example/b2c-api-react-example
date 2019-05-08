import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { WishlistState } from '@stores/reducers/pages/wishlist/types';
import { getWishlistsAction } from '@stores/actions/pages/wishlist';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearOrdersCollectionAction } from '@stores/actions/pages/order';
import { clearAddressAction } from '@stores/actions/pages/addresses';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;

    return ({
        isWishlistsInitial: wishlistProps && wishlistProps.data ? wishlistProps.data.isInitialList : false
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getWishlistsAction,
            clearAddressAction,
            clearOrdersCollectionAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
