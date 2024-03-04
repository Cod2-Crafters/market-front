'use client';

import { HeadText } from '../texts/HeadText';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

import { useId, useState } from 'react';

type TDataArray = {
    title: string;
    items: Array<TDataItem>;
};
type TDataItem = {
    value: string;
    text: string;
};

// const dataArray: TDataArray = {
//     title: '지불종류',
//     items: [
//         // key: number type
//         { id: 1, value: 'yes', text: '선지불' },
//         { id: 2, value: 'no', text: '선지불' },
//         { id: 3, value: 'free', text: '무료' },
//     ],
// };

const ToggleGroupButton = ({ title, items }: TDataArray) => {
    const [toggleValue, setToggleValue] = useState<string>();
    return (
        <>
            <HeadText className={'text-gray-30'} size={'lg'}>
                <b>{title}</b>
            </HeadText>
            <ToggleGroup
                className="mt-20 gap-10"
                type="single"
                defaultChecked={true}
                onValueChange={(selectValue) => {
                    if (selectValue == '') {
                        // 선택취소 방지
                        return false;
                    }
                    setToggleValue(() => selectValue);
                }}
                value={toggleValue}
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
