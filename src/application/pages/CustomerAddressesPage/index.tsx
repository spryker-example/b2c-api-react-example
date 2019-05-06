import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { ICustomerAddressPageProps as Props, ICustomerAddressPageState as State } from './types';
import { pathAddressFormNew, pathAddressFormUpdateBase } from '@constants/routes';
import { AddressesList } from './AddressesList';
import { Button, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class CustomerAddressBase extends React.Component<Props, State> {
    public state: State = {};

    public componentDidMount = (): void => {
        this.props.setCurrentAddressAction(null);

        this.initRequestData();
    };

    public handleAddAddress = () => {
        this.props.routerPush(pathAddressFormNew);
    };

    public setUpdatedAddress = (addressId: string) => () => {
        this.props.setCurrentAddressAction(addressId);
        this.props.routerPush(`${pathAddressFormUpdateBase}/${addressId}`);
    };

    private initRequestData = () => {
        const {addresses, isLoading, customer} = this.props;
        if (isLoading) { return; }

        if ((addresses && Array.isArray(addresses) && !addresses.length) && customer) {
            this.props.getAddressesAction(customer);
        }
    };

    public render(): JSX.Element {
        const { classes, customer, addresses, isLoading, deleteAddressAction } = this.props;

        return (
            <>
                <div className={classes.heading}>
                    <Typography component="h2" variant="h2">
                        <FormattedMessage id={'word.addresses.title'} />
                    </Typography>

                    <Button variant="outlined" onClick={ this.handleAddAddress } className={ classes.addButton }>
                        <FormattedMessage id={ 'add.address.title' } />
                    </Button>
                </div>

                <AddressesList
                    isLoading={ isLoading }
                    customer={ customer }
                    customerAddresses={ addresses }
                    updatedAddressHandler={ this.setUpdatedAddress }
                    deleteAddressHandler={ deleteAddressAction }
                />
            </>
        );
    }
}

export const CustomerAddressPage = withStyles(styles)(CustomerAddressBase);
