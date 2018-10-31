import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {

  },
  list: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  title: {
    paddingLeft: theme.spacing.unit,
  },
});
