import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

import {styles} from './styles';

export interface IImageSlide {
  id: string | number;
  src: string;
}
interface ImageSliderProps extends WithStyles<typeof styles> {
  images: Array<IImageSlide>;
}

export const ImageSliderBase: React.SFC<ImageSliderProps> = (props): JSX.Element => {
  const { classes, images } = props;
  if (!images) {
    return null;
  }
  const isMultipleImages = images.length > 1;
  return (
    <Carousel
      showArrows={isMultipleImages}
      className={classes.slider}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={isMultipleImages}
      showStatus={isMultipleImages}
    >
      { (images)
        ? images.map( (image) => <div key={image.id}><img src={image.src} /></div> )
        : null
      }
    </Carousel>
  );
};

export const ImageSlider = withStyles(styles)(ImageSliderBase);
