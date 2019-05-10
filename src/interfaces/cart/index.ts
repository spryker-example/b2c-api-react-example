import { IAbstractTotals } from '@interfaces/abstract/totals';
import { IProductPricesItem } from '@interfaces/product';
import { TAppCurrency } from '@interfaces/currency';

export type TCartPriceMode = string;
export type TCartStore = string;
export type TCartDisplayName = string;
export type TCartAmount = number;
export type TCartCode = string;
export type TCartAddItemCollection = ICartAddItem[] | null;

export interface ICartDiscounts {
    displayName: TCartDisplayName;
    amount: TCartAmount;
    code: TCartCode;
}

export interface ICartAddItem {
    sku: string;
    quantity: number;
}

export interface ICartTotals extends IAbstractTotals {

}

export interface ICartItem {
    sku: string | null;
    abstractSku: string;
    name?: string | null;
    image?: string | null;
    quantity?: number | null;
    amount?: number | null;
    prices?: IProductPricesItem[];
    calculations?: ICartItemCalculation | null;
    groupKey?: string | null;
    availability?: boolean | null;
    availableQuantity?: number | null;
    superAttributes?: { [key: string]: string }[] | null;
    priceOriginalGross?: number | null;
    priceOriginalNet?: number | null;
    priceDefaultGross?: number | null;
    priceDefaultNet?: number | null;
}

export interface ICartDataResponse extends ICommonDataInCart {
    isCartEmpty?: boolean;
    items: ICartItem[];
    totalQty?: number;
}

export interface ICommonDataInCart {
    id: string | null;
    currency: TAppCurrency;
    discounts?: ICartDiscounts | {};
    priceMode: TCartPriceMode | null;
    store: TCartStore | null;
    totals: ICartTotals;
    cartCreated?: boolean;
}

export interface ICartItemCalculation {
    sumDiscountAmountAggregation: number;
    sumDiscountAmountFullAggregation: number;
    sumGrossPrice: number;
    sumNetPrice: number;
    sumPrice: number;
    sumPriceToPayAggregation: number;
    sumProductOptionPriceAggregation: number;
    sumSubtotalAggregation: number;
    sumTaxAmountFullAggregation: number;
    taxRate: number;
    unitDiscountAmountAggregation: number;
    unitDiscountAmountFullAggregation: number;
    unitGrossPrice: number;
    unitNetPrice: number;
    unitPrice: number;
    unitPriceToPayAggregation: number;
    unitProductOptionPriceAggregation: number;
    unitSubtotalAggregation: number;
    unitTaxAmountFullAggregation: number;
}

interface ICartResponseItemAttributes {
    amount: number | null;
    calculations: ICartItemCalculation;
    groupKey: string;
    quantity: number;
    sku: string;
}

export interface ICartResponseItem {
    attributes: ICartResponseItemAttributes;
    id?: string;
    links?: object;
    relationships?: object;
    type?: string;
}
