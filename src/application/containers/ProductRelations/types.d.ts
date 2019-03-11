import { TProductSKU } from '@interfaces/product';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { TAppCurrency } from '@interfaces/currency';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductRelationsProps extends WithStyles<styles> {
    isLoading: boolean;
    sku: TProductSKU;
    products: IProductRelationsItem[];
    currency: TAppCurrency;

    getProductRelations: (sku: string) => void;
    changeLocation: Function;
}

export interface IProductRelationsState {
    productSku: TProductSKU;
}
