import { WithStyles } from '@material-ui/core';
import { styles } from '@application/pages/WishlistPage/styles';

export interface IWishlistPageProps extends WithStyles<typeof styles> {
    dispatch: Function;
    isLoading: boolean;
    isInitial: boolean;

    getWishlistsAction(): void;
}
