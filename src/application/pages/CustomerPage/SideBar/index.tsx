import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { INavLinkData } from '@interfaces/navigations';
import { NavLink } from 'react-router-dom';
import { customerProfileNavLinks } from '@constants/navLinks';
import { withStyles } from '@material-ui/core';
import { ISideBarProps as Props } from './types';
import { styles } from './styles';

const SideBarComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, location } = props;

    return (
        <div className={ classes.rootPaper }>
            <div>
                { customerProfileNavLinks.map((item: INavLinkData) => {
                    const isSelected = location.pathname.includes(item.path);

                    return (
                        <div key={ item.title } selected={ isSelected }>
                            <NavLink to={ item.path }
                                     className={ classes.link }>
                                <FormattedMessage id={ item.title } />
                            </NavLink>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}

export const SideBar = withStyles(styles)(SideBarComponent);
