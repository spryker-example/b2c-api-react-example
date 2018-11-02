import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {FoundItemsProps} from "src/shared/components/Pages/SearchPage/FoundItems/index";
import {SprykerSelectProps} from "src/shared/components/UI/SprykerSelect/index";


interface SortPanelProps extends WithStyles<typeof styles> {
  foundItems: React.SFC<FoundItemsProps>;
  numberMode: React.SFC<SprykerSelectProps>;
  sorterMode: React.SFC<SprykerSelectProps>;
  isProductsExist: boolean;
}


export const SortPanelBase: React.SFC<SortPanelProps> = (props) => {
  const {
    classes,
    foundItems,
    numberMode,
    sorterMode,
    isProductsExist,
  } = props;

  if (!isProductsExist) {
    return null;
  }

  return (
    <Grid container
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 } sm={3} >
        {foundItems}
      </Grid>

      <Grid item xs={ 12 } sm={9}>
        <div className={classes.sortsOuter}>
          <div className={classes.sort}>
            {numberMode}
          </div>
          <div className={classes.sort}>
            {sorterMode}
          </div>
        </div>
      </Grid>

    </Grid>
  );

};

export const SortPanel = withStyles(styles)(SortPanelBase);