import {
  LOCALE_DEFAULT,
} from '../../constants/Environment';
import {TAppCurrency} from "../../reducers/Common/Init";

export const getFormattedPrice = (
  value: number,
  currency: TAppCurrency,
  locale: string = LOCALE_DEFAULT
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });

  return formatter.format(value);
};
