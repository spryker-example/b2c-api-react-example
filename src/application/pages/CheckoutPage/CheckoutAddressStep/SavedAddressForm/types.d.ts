import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IRadioItem } from '@components/UI/SprykerForm/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { InputChangeEvent } from '@interfaces/common';

export interface ISavedAddressFormProps extends WithStyles<typeof styles> {
    currentMode: IRadioItem['value'];
    addressesCollection: IAddressItemCollection[] | null;
    formName: string;
    onFieldChangeHandler: (event: InputChangeEvent) => void;
    extraField: {
        value: string;
        label: React.ReactNode
    };
}
