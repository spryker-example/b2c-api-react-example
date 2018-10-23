import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {IProductCard, IProductLabel} from '../../../interfaces/product';
import { styles } from './styles';
import { AppPrice } from '../AppPrice';
import {ProductLabel} from "src/shared/components/Common/ProductLabel/index";

interface ProductCardProps extends WithStyles<typeof styles>, IProductCard {
  onSelectProduct?: Function;
}

export const ProductCardBase: React.SFC<ProductCardProps> = (props) => {
  const {classes, images, abstract_name, abstractName, price, prices, abstract_sku, abstractSku} = props;
  const name = abstract_name || abstractName || 'No name';
  const sku = abstract_sku || abstractSku;

  let actualPrice = 0;

  if (prices && prices.length > 1) {
    prices.forEach((data) => {
      if (data.priceTypeName === 'ORIGINAL') {
        actualPrice = data.ORIGINAL;
      }
    });
  } else {
    if (prices && prices.length === 1) {
      const priceType: string = prices[0].priceTypeName;
      actualPrice = prices[0][priceType];
    } else {
      actualPrice = price || 0;
    }
  }

  const priceToShow = <AppPrice value={ actualPrice }/>;
  const image = (images && images.length) ? (images[0].external_url_small || images[0].externalUrlSmall || '') : false;

  // TODO: Get label programmatically
  const label: IProductLabel = {
    type: 'sale',
    text: 'Sale',
  };

  const handleProductClick = (e: any) => {
    e.preventDefault();
    props.onSelectProduct(sku, name);
  };

  return (
    <Card className={classes.card} raised={true} >
      <CardActionArea onClick={ handleProductClick } className={ classes.actionArea } >
        { image
          ? <CardMedia
            component="img"
            className={ classes.media }
            image={ image }
            title={ name }
          />
          : null
        }
        <ProductLabel label={label} />
        <div className={ classes.actionAreaOverlay }></div>
      </CardActionArea>
      <CardContent className={ classes.cardContent }>
        <Typography gutterBottom component="h2" className={ classes.productName } data-type="productName">
          { name }
        </Typography>
        <div className={classes.productPrice}>
          <Typography
            component="span"
            color="textPrimary"
            data-type="priceToShow"
            className={classes.productCurrentPrice}
          >
            { priceToShow }
          </Typography>
          <Typography
            component="span"
            color="textPrimary"
            className={classes.productOldPrice}
          >
            { priceToShow }
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductCard = withStyles(styles)(ProductCardBase);
