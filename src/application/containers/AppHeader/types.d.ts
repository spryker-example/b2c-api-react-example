import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IAppHeaderState {
    showSearch: boolean;
    headerHeight: number;
    pageWidth: number;
    pageHeight: number;
}

export interface IAppHeaderProps extends WithStyles<typeof styles>, WithRouter {
    isLoading: boolean;
    isMobileNavOpened: boolean;
    locale: string;
    onMobileNavToggle(): void;
}
