import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableHomePage = Loadable({
    loader: () =>
        import('@pages/HomePage').then(
            module => module.HomePage,
        ),
    loading: () => <Preloader />,
});
