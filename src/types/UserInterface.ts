import { Dispatch, SetStateAction } from 'react';

// radio button state
export interface RadioButtonState {
    id?: string;
    value: string;
    title: string;
    desc?: string;
}

export interface ToggleButtonState<T> {
    title: string;
    items: T[];
    selectedValue: string;
    setValue: (value: string) => void;
}

export interface ToggleButtonItemState {
    value: string;
    text: string;
}

// dsiable
// export type ProductTradeStatus = 'NO' | 'YES';
// export interface ProductTradeItemState {
//     value: ProductTradeStatus;
//     text: string;
// }
