import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableOrderHistoryPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableOrderHistoryPage" */
            '@application/pages/OrderHistoryPage').then(
            module => module.OrderHistoryContainer,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
