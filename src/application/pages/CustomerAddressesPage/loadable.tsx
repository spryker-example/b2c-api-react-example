import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerAddressPage = Loadable({
    loader: () =>
        import('@application/pages/CustomerAddressesPage').then(
            module => module.CustomerAddressPage
        ),
    loading: () => <Preloader />,
});
