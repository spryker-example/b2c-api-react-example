import { api, ApiServiceAbstract } from '@services/api';
import { parseProductResponse } from '@helpers/parsing/product';
import * as productActions from '@stores/actions/pages/product';
import { IProductDataParsed } from '@interfaces/product';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';

export class ProductService extends ApiServiceAbstract {
    public static async getAbstractData(dispatch: Function, sku: string): Promise<void> {
        try {
            dispatch(productActions.getProductDataItemPendingStateAction());
            const response: TApiResponseData = await api.get(`abstract-products/${ sku }`, {
                include: 'abstract-product-image-sets,' +
                    'abstract-product-prices,' +
                    'abstract-product-availabilities,' +
                    'concrete-products,' +
                    'concrete-product-image-sets,' +
                    'concrete-product-prices,' +
                    'concrete-product-availabilities,' +
                    'product-labels'
            });

            if (response.ok) {
                const responseParsed: IProductDataParsed = parseProductResponse(response.data);
                dispatch(productActions.getProductDataFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(productActions.getProductDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(productActions.getProductDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
