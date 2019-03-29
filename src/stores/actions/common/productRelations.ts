import { PRODUCT_RELATIONS_REQUEST } from '@stores/actionTypes/common/productRelations';
import { ProductRelationsService } from '@services/common/ProductRelations';
import { TProductSKU } from '@interfaces/product';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { TCartId } from '@interfaces/cart';

export const productRelationsPendingAction = () => ({
    type: `${ PRODUCT_RELATIONS_REQUEST }_PENDING`
});

export const productRelationsRejectedAction = (message: string) => ({
    type: `${ PRODUCT_RELATIONS_REQUEST }_REJECTED`,
    payloadRejected: { error: message }
});

export const productRelationsFulfilledAction = (payload: IProductRelationsItem[]) => ({
    type: `${ PRODUCT_RELATIONS_REQUEST }_FULFILLED`,
    payloadFulfilled: payload
});

export const getProductRelationsAction = function (payload: TProductSKU) {
    return (dispatch: Function, getState: Function) => {
        ProductRelationsService.getProductRelations(dispatch, payload);
    };
};

export const getProductRelationsCartAction = function (payload: TCartId) {
    return (dispatch: Function, getState: Function) => {
        ProductRelationsService.getProductRelationsCart(dispatch, payload);
    };
};