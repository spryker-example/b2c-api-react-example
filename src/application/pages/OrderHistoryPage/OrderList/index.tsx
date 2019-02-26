import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { formatDateToString } from '@helpers/common/dates';
import { appFixedDimensions } from '@theme/properties/new/appFixedDimensions';
import { pathOrderDetailsPageBase } from '@constants/routes';
import { AppPrice } from '@application/components/AppPrice';
import { AppTable } from '@application/components/AppTable';
import { IOrderListProps as Props } from '@application/pages/OrderHistoryPage/OrderList/types';
import { IOrderItem } from '@interfaces/order';
import { ICellInfo, ITableRow } from '@application/components/AppTable/types';
import { styles } from './styles';

export const OrderListBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes, orders} = props;

    const headerCellPart = 'header-';
    const rowPart = 'order-';

    const headerCells: ICellInfo[] = [
        {id: `${headerCellPart}1`, content: <FormattedMessage id={ 'order.id.title' } />},
        {id: `${headerCellPart}2`, content: <FormattedMessage id={ 'orders.date.title' } />},
        {id: `${headerCellPart}3`, content: <FormattedMessage id={ 'orders.total.title' } />},
        {id: `${headerCellPart}4`, content: ''},
    ];

    const bodyRows: ITableRow[] = orders.map((item: IOrderItem) => ({
        id: `${rowPart}${item.id}`,
        cells: [
            {id: `id-${item.id}`, content: `#${item.id}`},
            {id: `date-${item.id}`, content: formatDateToString(new Date(item.dateCreated))},
            {
                id: `price-${item.id}`,
                content: <AppPrice
                    value={item.totals.grandTotal}
                    specificCurrency={item.currency}
                    extraClassName={classes.price}
                    isStylesInherited={true}
                />
            },
            {
                id: `actions-${item.id}`,
                content: <NavLink
                    to={`${pathOrderDetailsPageBase}/${item.id}`}
                    className={classes.orderBtn}
                >
                    <FormattedMessage id={ 'orders.view.order.title' } />
                </NavLink>
            },
        ],
    }));

    return (
        <div className={classes.root}>
            <AppTable
                headerCells={headerCells}
                bodyRows={bodyRows}
                isResponsive={true}
                width={appFixedDimensions.customerSubPageWidth}
            />
        </div>
    );
};

export const OrderList = withStyles(styles)(OrderListBase);
