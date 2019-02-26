import { IProductCard } from '@interfaces/product';
import { IPagination } from '@application/components/AppPagination/types';
import { TCategoryId } from '@application/pages/SearchPage/types';
import { TAppCurrency } from '@interfaces/currency';
import { TActiveFilters, TActiveRangeFilters } from '@application/pages/SearchPage/types';

export type TSpellingSuggestion = string;
export type TLocalizedName = string;
export type TDocCount = number;
export type TLabelId = string;
export type TSearchTerm = string;

export interface FilterValue {
    value: string | number;
    doc_count: TDocCount | null;
}

export interface ValueFacets {
    name: string;
    docCount: TDocCount | null;
    values: FilterValue[];
    activeValue: string | null;
    localizedName: TLocalizedName;
}

export interface RangeFacets {
    name: string;
    min: number;
    max: number;
    activeMin: number;
    activeMax: number;
    docCount: TDocCount | null;
    localizedName: TLocalizedName;
}

export interface FlyoutSearch {
    suggestions: IProductCard[] | null;
    categories: { [name: string]: string }[] | null;
    completion: string[] | null;
    pending: boolean;
}

export interface IProductLabelResponse {
    type: string;
    id: string;
}

export interface IAvailableLabel {
    id: string;
    frontEndReference: string;
    isExclusive: boolean;
    name: string;
    position: number;
}

export interface IProductsLabeledCollection {
    [id: string]: TLabelId[];
}

export interface IAvailableLabelsCollection {
    [id: string]: IAvailableLabel;
}

export interface ILocalizedNamesMap {
    [key: string]: TLocalizedName;
}

export interface ICatalogSearchDataParsed {
    items: IProductCard[] | null;
    filters: ValueFacets[] | null;
    activeFilters: TActiveFilters;
    category: FilterValue[];
    currentCategory: string | null;
    currentSort: string | null;
    rangeFilters: RangeFacets[] | null;
    activeRangeFilters: TActiveRangeFilters;
    sortParams: string[] | null;
    sortParamLocalizedNames: ILocalizedNamesMap | null;
    categoriesLocalizedName: TLocalizedName | null;
    pagination: IPagination;
    spellingSuggestion: TSpellingSuggestion | null;
    productsLabeled: IProductsLabeledCollection | null;
    availableLabels: IAvailableLabelsCollection | null;
    searchTerm?: TSearchTerm;
}

export interface ISearchPageData extends ICatalogSearchDataParsed {
    dispatch?: Function;
    flyoutSearch?: FlyoutSearch;
    currency?: TAppCurrency;
}

export interface ISearchQuery {
    q?: string;
    currency?: TAppCurrency;
    sort?: string;
    category?: TCategoryId;
    ipp?: number;
    label?: string;
    page?: string | number;

    [key: string]: string | number | string[];
}
