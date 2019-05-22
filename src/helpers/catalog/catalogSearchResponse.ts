import {
    IFilterValue,
    ICatalogSearchDataParsed,
    IValueFacets,
    IAvailableLabelsCollection,
    TActiveFilters,
    TActiveRangeFilters
} from '@interfaces/search';
import { rangeMaxType, rangeMinType } from '@constants/search';
import { ICatalogSearchRawResponse, IRowCatalogSearchIncludedResponse } from '@helpers/catalog/types';
import { rangeFilterValueToFront } from '@helpers/common';
import { getProductLabel } from '@helpers/parsing/common';

export const parseCatalogSearchResponse = (response: ICatalogSearchRawResponse): ICatalogSearchDataParsed | null => {
    if (!response) {
        return null;
    }

    const { data, included }: ICatalogSearchRawResponse = response;

    if (!data || !data[0]) {
        return null;
    }

    const attributes = data[0].attributes;
    const pagination = attributes.pagination;
    const filters: IValueFacets[] = [];
    const activeFilters: TActiveFilters = {};
    const activeRangeFilters: TActiveRangeFilters = {};
    const currentSort: string = attributes.sort.currentSortParam || ' ';
    const currentPaginationPage: number = pagination.currentPage;
    let category: IFilterValue[] = [];
    let currentCategoryId: number = null;
    let categoriesLocalizedName: string | null = null;

    attributes.valueFacets.forEach((filter: IValueFacets) => {
        if (filter.name === 'category') {
            category = Array.isArray(filter.values) ? filter.values : [];
            currentCategoryId = Number(filter.activeValue);
            categoriesLocalizedName = filter.localizedName;
        } else {
            filters.push(filter);

            if (filter.activeValue) {
                activeFilters[filter.name] = Array.isArray(filter.activeValue)
                    ? filter.activeValue : [filter.activeValue];
            }
        }
    });

    attributes.rangeFacets.forEach(range => {
        if (range.activeMin !== range.min || range.activeMax !== range.max) {
            activeRangeFilters[range.name] = {
                min: rangeFilterValueToFront(range.activeMin, rangeMinType),
                max: rangeFilterValueToFront(range.activeMax, rangeMaxType)
            };
        }
    });

    const parseProductItems = attributes.abstractProducts.map(item => ({
        ...item,
        labels: null,
        image: item.images[0].externalUrlSmall
    }));

    const result: ICatalogSearchDataParsed = {
        items: parseProductItems,
        filters,
        activeFilters,
        category,
        currentCategoryId,
        currentSort,
        currentItemsPerPage: attributes.pagination.currentItemsPerPage,
        currentPaginationPage,
        rangeFilters: attributes.rangeFacets,
        activeRangeFilters,
        sortParams: attributes.sort.sortParamNames,
        sortParamLocalizedNames: attributes.sort.sortParamLocalizedNames,
        categoriesLocalizedName,
        pagination: {
            numFound: pagination.numFound,
            currentPage: pagination.currentPage,
            maxPage: pagination.maxPage,
            currentItemsPerPage: pagination.currentItemsPerPage,
            validItemsPerPageOptions: pagination.config.validItemsPerPageOptions
        },
        spellingSuggestion: attributes.spellingSuggestion
    };

    if (!included) {
        return result;
    }

    const availableLabels: IAvailableLabelsCollection | null = getAvailableLables(included);

    included.forEach((row: IRowCatalogSearchIncludedResponse) => {
        const isProductHasLabels = row.type === 'abstract-products' && row.relationships &&
            row.relationships['product-labels'] && availableLabels;

        if (isProductHasLabels) {
            const labelsIdArr: string[] = row.relationships['product-labels'].data.map(item => item.id);
            const appropriateResultItem = result.items.filter(item => item.abstractSku === row.id)[0];

            appropriateResultItem.labels = getProductLabel(labelsIdArr, availableLabels);
        }
    });

    return result;
};

const getAvailableLables = (included: IRowCatalogSearchIncludedResponse[]): IAvailableLabelsCollection | null => {
    const availableLabels: IAvailableLabelsCollection | null = {};
    const productLabelsType = 'product-labels';

    const includedLabels: IRowCatalogSearchIncludedResponse[] = included.filter(item => (
        item.type === productLabelsType
    ));

    includedLabels.forEach((label: IRowCatalogSearchIncludedResponse) => {
        availableLabels[label.id] = {
            id: label.id,
            frontEndReference: label.attributes.frontEndReference,
            isExclusive: label.attributes.isExclusive,
            name: label.attributes.name,
            position: label.attributes.position
        };
    });

    return availableLabels;
};
