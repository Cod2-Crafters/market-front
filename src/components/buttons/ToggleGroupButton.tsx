'use client';

import { ProductTradeItemState, ToggleButtonItemState } from '../../types/UserInterface';
import { HeadText } from '../texts/HeadText';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

import { ToggleButtonState } from '@/types/UserInterface';
import { useId } from 'react';

// const dataArray: TDataArray = {
//     title: '지불종류',
//     items: [
//         // key: number type
//         { id: 1, value: 'yes', text: '선지불' },
//         { id: 2, value: 'no', text: '선지불' },
//         { id: 3, value: 'free', text: '무료' },
//     ],
// };

type ToggleButtonItemTypes = ToggleButtonItemState | ProductTradeItemState;
const ToggleGroupButton = ({ title, items, selectedValue, setValue }: ToggleButtonState<ToggleButtonItemTypes>) => {
    //const [toggleSelectedValue, setToggleSelectedValue] = useState<string>();

    return (
        <>
            <HeadText className={'text-gray-30'} size={'xl'}>
                <b>{title}</b>
            </HeadText>
            <ToggleGroup
                className="mt-20 gap-10"
                type="single"
                defaultChecked={true}
                onValueChange={(selectValue) => {
                    if (selectValue == '') {
                        // 계속 선택 취소 방지
                        return false;
                    }
                    setValue(selectValue);
                }}
                value={selectedValue}
            >
                {items?.map((item) => {
                    return (
                        <ToggleGroupItem key={useId()} value={item.value}>
                            {item.text}
                        </ToggleGroupItem>
                    );
                })}
            </ToggleGroup>
        </>
    );
};

export default ToggleGroupButton;
