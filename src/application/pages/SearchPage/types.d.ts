import { ISearchPageData, ISearchQuery } from 'src/shared/interfaces/searchPageData';
import { History, Location } from 'history';
import { RouteProps } from 'react-router';
import { WithRouter } from 'src/shared/interfaces/common/react';
import { ICategory } from 'src/shared/interfaces/category';
import { TAppCurrency } from '@interfaces/currency';
import { TActiveFilters, TActiveRangeFilters } from '@application';
import { TSpellingSuggestion } from '@interfaces/searchPageData';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IBreadcrumbItem } from '@interfaces/category';

export interface ISearchPageProps extends WithStyles<typeof styles>, ISearchPageData, RouteProps, WithRouter {
    isLoading: boolean;
    changeLocation: Function;
    categoriesTree: ICategory[];
    location: Location;
    isFulfilled: boolean;
    isFiltersUpdated: boolean;
    locationCategoryId: TCategoryId;
    currentPaginationPage: number;
    sendSearch: (params: ISearchQuery) => void;
    clearActiveFilters: () => void;
    clearSearchTerm: () => void;
    clearSort: () => void;
    clearPaginationPage: () => void;
    isCategoryAsFilter: boolean;
    currency: TAppCurrency;
    searchTerm: string;
    currentSort: string;
    currentItemsPerPage: number;
    activeFilters: TActiveFilters;
    activeRangeFilters: TActiveRangeFilters;
    currentCategoryId: string;
    spellingSuggestion: TSpellingSuggestion;
    category: ICategory;
    history: History;
}

export interface ISearchPageState {
    formattedCategoriesTree: IBreadcrumbItem[];
}

export type TCategoryId = number | string;
