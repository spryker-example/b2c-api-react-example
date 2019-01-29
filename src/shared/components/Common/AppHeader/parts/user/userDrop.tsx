import * as React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { pathCustomerPage, pathLoginPage } from 'src/shared/routes/contentRoutes';
import { UserDropProps as Props } from './types';
import { connect } from './connect';
import { styles } from './styles';
import { ClickEvent } from 'src/shared/interfaces/common/react';
import { customerProfileNavLinks } from 'src/shared/constants/navLinks/index';
import { AppBtnLink } from 'src/shared/components/Common/AppBtnLink/index';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton/index';
import { INavLinkData } from 'src/shared/interfaces/navLinks/index';
import { FormattedMessage } from 'react-intl';
import { LogoutSetTimeoutTime } from 'src/shared/constants/customer';

@connect
@(withRouter as Function)
export class UserDropComponent extends React.Component<Props> {

    public customerLogout = (e: ClickEvent) => {
        e.preventDefault();
        if (this.props.location.pathname.includes(pathCustomerPage)) {
            this.props.logout();
        } else {
            this.props.history.push(pathCustomerPage);
            setTimeout(this.props.logout, LogoutSetTimeoutTime);
        }
    };

    public render() {
        const {classes, isUserLoggedIn} = this.props;

        const loggedInUser = (
            <React.Fragment>
                <ul className={ classes.userDropNav }>
                    { customerProfileNavLinks.map((item: INavLinkData) => {
                        return (
                            <li key={ item.title } onClick={ this.props.closePopoverHandler }>
                                <NavLink to={ item.path }>
                                    <FormattedMessage id={ item.title } />
                                </NavLink>
                            </li>
                        );
                    }) }
                </ul>
                <div className={ classes.userBtns }>
                    <SprykerButton
                        title={ <FormattedMessage id={ 'log.out.button.title' } /> }
                        onClick={ this.customerLogout }
                        extraClasses={ classes.actionLogOut }
                    />
                </div>
            </React.Fragment>
        );
        const notLoggedInUser = (
            <div className={ classes.userBtns }>
                <AppBtnLink
                    title={ <FormattedMessage id={ 'word.register.title' } /> }
                    path={ pathLoginPage }
                    extraClassName={ classes.action } />
                <AppBtnLink
                    title={ <FormattedMessage id={ 'log.in.button.title' } /> }
                    path={ pathLoginPage }
                    type="black"
                    extraClassName={ classes.action } />
            </div>
        );

        return (
            <div className={ classes.userDrop }>
                <Typography component="h5" className={ classes.title }>
                    <FormattedMessage id={ 'account.title' } />
                </Typography>
                { isUserLoggedIn ? loggedInUser : notLoggedInUser }
            </div>
        );
    }
}

export const UserDrop = withStyles(styles)(UserDropComponent);
