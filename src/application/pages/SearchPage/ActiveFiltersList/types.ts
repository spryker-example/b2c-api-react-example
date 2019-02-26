import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TActiveFilters, TActiveRangeFilters } from '@application/pages/SearchPage/types';
import { ILocalizedNamesMap, RangeFacets } from '@interfaces/searchPageData';

export interface IActiveFiltersListProps extends WithStyles<typeof styles> {
    activeValuesFilters: TActiveFilters;
    activeValuesRanges: TActiveRangeFilters;
    rangeFilters?: RangeFacets[];
    resetHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    filtersLocalizedNames: ILocalizedNamesMap | null;
    rangesLocalizedNames: ILocalizedNamesMap | null;
}
