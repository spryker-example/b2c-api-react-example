import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IFoundItemsProps } from 'src/shared/components/Pages/SearchPage/FoundItems/types';
import { IPagination } from '@components/Common/AppPagination/types';
import { IActiveSort, ILocalizedNamesMap } from '@interfaces/searchPageData';
import { setSortAction } from '@stores/actions/pages/search';

export interface ISortPanelProps extends WithStyles<typeof styles> {
    foundItems: React.SFC<IFoundItemsProps>;
    isProductsExist: boolean;
    currentSort: string;
    sortParams: string[];
    currentItemsPerPage: number;
    pagination: IPagination;
    sortParamLocalizedNames: ILocalizedNamesMap;

    setSortAction: (activeSortOptions: IActiveSort) => void;
}

export interface ISortPanelState extends IActiveSort {}
