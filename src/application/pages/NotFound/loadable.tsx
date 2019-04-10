import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableNotFound = Loadable({
    loader: () =>
        import('@application/pages/NotFound').then(
            module => module.default,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
