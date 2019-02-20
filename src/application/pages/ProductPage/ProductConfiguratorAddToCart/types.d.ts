import { ChangeEvent } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    IProductPropFullData,
    TProductAvailability,
    TProductQuantity,
    TProductSKU,
    TProductType
} from '@interfaces/product';
import { TCartId } from '@interfaces/cart';
import { ICartCreatePayload } from '@services/common/Cart/types';

export interface IProductConfiguratorAddToCartProps extends WithStyles<typeof styles> {
    product: IProductPropFullData | null;
    productType: TProductType | null;
    sku: TProductSKU | null;
    isUserLoggedIn: boolean;
    addItemToCart: Function;
    addItemGuestCart: Function;
    createCartAndAddItem: Function;
    cartCreated: boolean;
    cartId: TCartId;
    payloadForCreateCart: ICartCreatePayload;
    anonymId: string;
}

export interface IProductConfiguratorAddToCartState {
    quantitySelected: TProductQuantity;
    quantity: TProductQuantity | null;
    isBuyBtnDisabled?: boolean;
    isProcessCartLoading?: boolean;
    availability: TProductAvailability | null;
    sku: TProductSKU | null;
}

export interface IProductQuantityParams {
    onChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
    inputValue: IProductConfiguratorAddToCartState['quantitySelected'];
    quantity: IProductConfiguratorAddToCartState['quantity'];
    controlsGroupClassName?: string;
}
