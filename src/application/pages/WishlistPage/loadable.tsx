import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableWishlistPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableWishlistPage" */
            '@application/pages/WishlistPage').then(
            module => module.default,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
