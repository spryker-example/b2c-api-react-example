import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import * as React from 'react';
import { connect } from './connect';
import { addLocaleData, IntlProvider } from 'react-intl';
import { withRouter } from 'react-router';
import { getContentRoutes } from '@application/components/Routes';
import {
    pathCategoryPageBase,
    pathLoginPage,
    pathRegisterPage,
    pathSearchPage,
    pathForgotPassword,
    pathResetPassword
} from '@constants/routes';
import { withStyles } from '@material-ui/core';
import { AppHeader } from '@application/containers/AppHeader';
import { AppFooter } from '@application/components/AppFooter';
import { getLocaleData } from '@helpers/locale';
import { Notifications } from '@application/components/Notifications';
import { messages } from '@translation/';
import { IPageContentProps as Props, IPageContentState as State } from './types';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { styles } from './styles';

setConfig({ ErrorOverlay: () => null });

@connect
@(withRouter as Function)
class PageContentComponent extends React.Component<Props, State> {
    public readonly state: State = {
        mobileNavOpened: false
    };

    public componentDidMount = (): void => {
        const accessToken: string = localStorage.getItem('accessToken');
        const expiresIn: string = localStorage.getItem('tokenExpire');
        const refreshToken: string = localStorage.getItem('refreshToken');
        const customerRef: string = localStorage.getItem('customerRef');

        if (accessToken && expiresIn && refreshToken) {
            this.props.setAuth({
                accessToken,
                expiresIn,
                refreshToken,
                customerRef
            });
        }

        if (!this.props.isAppDataSet) {
            this.props.initApplicationData(null);

            return;
        }
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        this.clearFlyoutSearchHandler(prevProps);

        if (!prevProps.isAppDataSet && this.props.isAppDataSet) {
            if (this.props.isCustomerAuth) {
                this.props.getCustomerCart();
            } else {
                this.props.getGuestCart(this.props.anonymId);
            }
        }
    };

    protected clearFlyoutSearchHandler = (prevProps: Props): void => {
        if (this.props.location.pathname !== prevProps.location.pathname
            && this.props.location.pathname.includes(pathCategoryPageBase) === false
            && this.props.location.pathname.includes(pathSearchPage) === false
        ) {
            this.props.clearSearchTerm();
        }
    };

    protected isDataFulfilled = () => (
        Boolean(this.props.cartCreated && this.props.isInitStateFulfilled)
    );

    protected mobileNavToggle = () => this.setState(({ mobileNavOpened }) => ({ mobileNavOpened: !mobileNavOpened }));

    protected shouldHideFooter = (): boolean => {
        const forbiddenPaths = [pathLoginPage, pathRegisterPage, pathResetPassword, pathForgotPassword];
        const currentLocation = this.props.location.pathname;

        return forbiddenPaths.some(path => currentLocation.includes(path));
    };

    public render(): JSX.Element {
        const { isLoading, locale, classes } = this.props;
        const { mobileNavOpened } = this.state;
        addLocaleData(getLocaleData(locale));

        return (
            <IntlProvider locale={ locale } messages={ messages[ locale ] }>
                <div className={ classes.root }>
                    <AppHeader
                        isLoading={ isLoading }
                        onMobileNavToggle={ this.mobileNavToggle }
                        isMobileNavOpened={ mobileNavOpened }
                    />
                    <ErrorBoundary>
                        {getContentRoutes(this.isDataFulfilled())}
                    </ErrorBoundary>
                    <Notifications />
                    {!this.shouldHideFooter() && <AppFooter/>}
                </div>
            </IntlProvider>
        );
    }
}

const PageContent = withStyles(styles)(PageContentComponent);
export default hot(PageContent);
