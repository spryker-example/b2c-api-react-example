import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { IProductRelationsProps as Props, IProductRelationsState as State } from './types';
import { TProductSKU } from '@interfaces/product';
import { ProductsSlider } from '@application/components/ProductsSlider';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathProductPageBase } from '@constants/routes';

@connect
class ProductRelationsBase extends React.Component<Props, State> {
    public state: State = {
        productSku: this.props.sku
    };

    protected onSelectProductHandle = (sku: TProductSKU): void => {
        this.props.changeLocation(`${pathProductPageBase}/${sku}`);

        this.setState({
            productSku: sku
        });
    };

    public componentDidMount = (): void => {
        const { sku, getProductRelations } = this.props;

        if (sku) {
            getProductRelations(sku);
        }
    };

    public componentDidUpdate = (): void => {
        const { isLoading, sku, getProductRelations } = this.props;

        if (!isLoading && sku !== this.state.productSku) {
            getProductRelations(this.state.productSku);
        }
    };

    public render = (): JSX.Element => {
        const { classes, products, currency } = this.props;

        if (!products.length) {
            return null;
        }

        return (
            <div className={ classes.root }>
                <Typography className={ classes.title } color="textSecondary" component="h2" variant="display3">
                    <FormattedMessage id={ 'product.relations.title' } />
                </Typography>

                <ProductsSlider
                    products={ products }
                    currency={ currency }
                    onSelectProduct={ this.onSelectProductHandle }
                />
            </div>
        );
    };
}

export const ProductRelations = withStyles(styles)(ProductRelationsBase);
