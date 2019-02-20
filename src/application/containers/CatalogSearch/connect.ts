import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@application/hoc/Reduxify';
import { FlyoutSearch } from '@interfaces/searchPageData';
import { getAppCurrency } from '@stores/reducers/common/init';
import { clearSuggestions, sendSuggestionAction } from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppCurrency } from '@interfaces/currency';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return (
        {
            categories: searchProps ? searchProps.categories : null,
            suggestions: searchProps ? searchProps.suggestions : null,
            completion: searchProps ? searchProps.completion : null,
            isLoading: searchProps ? searchProps.pending : null,
            currency
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            clearSuggestions,
            sendSuggestionAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
