import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        height: '100%',
        alignItems: 'center',
        boxShadow: 'none',
        transition: 'box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        }
    },
    media: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        maxWidth: '90%',
        maxHeight: '90%'
    },
    imageWrapper: {
        borderRadius: 4,
        position: 'relative',
        width: '100%',
        flexShrink: 0
    },
    image: {
        width: '100%',
        minWidth: '100%',
        height: 360
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 15,
        width: '100%',
        minHeight: 136
    },
    nameWrapper: {
        paddingBottom: 9,
        flexGrow: 1
    },
    name: {
        maxHeight: 42,
        overflow: 'hidden',
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 2,
        boxOrient: 'vertical'
    },
    prices: {
        flexShrink: 0
    },
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        fontSize: 14
    }
});
