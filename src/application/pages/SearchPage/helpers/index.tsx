import {
    FilterValue,
    ILocalizedNamesMap,
    ISearchPageData,
    RangeFacets,
    ValueFacets
} from '@interfaces/searchPageData';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import {
    rangeMaxType,
    rangeMinType,
    RangeType,
    TActiveRangeFilters
} from '@application/pages/SearchPage/types';
import { IActiveFilterCategories } from '@application/pages/SearchPage/CategoriesList/types';
import { labeledCategories } from '@constants/routes';
import { ICategory, IBreadcrumbItem } from '@interfaces/category';

export const isValidRangeInput = (
    activeRanges: TActiveRangeFilters,
    defaultRanges: ISearchPageData['rangeFilters']
): boolean => {
    const activeData: { [key: string]: RangeType } = {...activeRanges};
    const defaultData = [...defaultRanges];
    let canMakeNewRequest: boolean = true;

    defaultData.forEach((filter: RangeFacets) => {
        if (activeData[filter.name]) {
            const defaultMin = rangeFilterValueToFront(filter.min, rangeMinType);
            const defaultMax = rangeFilterValueToFront(filter.max, rangeMaxType);

            for (const prop in activeData[filter.name]) {
                if (activeData[filter.name][prop] < defaultMin
                    || activeData[filter.name][prop] > defaultMax
                ) {
                    canMakeNewRequest = false;
                }
            }
        }
    });

    return canMakeNewRequest;
};

export const getFormattedActiveCategories = (data: FilterValue[]): IActiveFilterCategories | null => {
    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    const response: IActiveFilterCategories = {};

    data.forEach((item: FilterValue) => {
        response[item.value] = item.doc_count;
    });

    return response;
};

export const getRangeFiltersLocalizedNames = (data: RangeFacets[] | null): ILocalizedNamesMap | null => {
    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    const response: ILocalizedNamesMap = {};

    data.forEach((item: RangeFacets) => {
        response[item.name] = item.localizedName;
    });

    return response;
};

export const getFiltersLocalizedNames = (data: ValueFacets[] | null): ILocalizedNamesMap | null => {
    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    const response: ILocalizedNamesMap = {};

    data.forEach((item: ValueFacets) => {
        response[item.name] = item.localizedName;
    });

    return response;
};

export const getLabeledCategory = (category: string | number): string | null => {
    if (!category) {
        return null;
    }

    const labelValue = labeledCategories[category];

    if (!labelValue) {
        return null;
    }

    return labelValue;
};

export const getCurrentCategoriesTree = (
    categoriesTree: ICategory[],
    categoryId: string): IBreadcrumbItem[] | null => {

    if (!categoryId) {
        return null;
    }

    for (let i = 0; i < categoriesTree.length; i++) {
        if (categoriesTree[i].nodeId.toString() === categoryId) {
            return [{
                name: categoriesTree[i].name,
                nodeId: categoriesTree[i].nodeId,
                current: true
            }];
        }

        const arrayCategoryParents = getCurrentCategoriesTree(categoriesTree[i].children as ICategory[], categoryId);

        if (arrayCategoryParents != null) {
            arrayCategoryParents.unshift({
                name: categoriesTree[i].name,
                nodeId: categoriesTree[i].nodeId
            });

            return arrayCategoryParents;
        }
    }
};
