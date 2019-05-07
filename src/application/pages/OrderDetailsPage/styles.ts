import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const generalInfoTitleWidth = 113;

export const styles = (theme: Theme) => createStyles({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    amount: {
        height: 28,
        padding: '5px 14px',
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey,
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    block: {
        padding: '20px 25px 25px',
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    generalInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 1.7,
        color: theme.appColors.grey,
        margin: 0,
        paddingBottom: 10
    },
    generalInfoDescritption: {
        paddingBottom: 7,
        margin: 0,
        width: `calc(100% - ${generalInfoTitleWidth}px)`
    },
    generalInfoTitle: {
        paddingBottom: 7,
        color: theme.appColors.black,
        width: generalInfoTitleWidth,
        fontWeight: 500
    }
});
