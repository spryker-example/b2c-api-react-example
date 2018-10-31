import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface AppHeaderState {
  showSearch: boolean;
  stickyTriggerOffset: number;
}
export interface AppHeaderProps extends WithStyles<typeof styles> {
  isLoading: boolean;
  onMobileNavToggle(): void;
  isMobileNavOpened: boolean;
}
