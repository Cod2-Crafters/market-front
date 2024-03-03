'use client';

import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

import { useState } from 'react';

type Props = {};

// productStatusData -> page 영역으로 뺼 것
const productStatusData = [
    { id: 'radio1', value: 'new', title: '새 상품(미사용)', desc: '사용하지 않는 새 상품' },
    {
        id: 'radio2',
        value: 'old1',
        title: '사용감 없음',
        desc: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
    },
    { id: 'radio3', value: 'old2', title: '사용감 적음', desc: '눈에 띄는 흔적이나 얼룩이 약간 있음' },
    { id: 'radio4', value: 'old3', title: '사용감 많음', desc: '눈에 띄는 흔적이나 얼룩이 많으 있음' },
    {
        id: 'radio5',
        value: 'old4',
        title: '고장/파손 상품',
        desc: '기능 이상이나 외관 손상 등으로 수리/수선 필요',
    },
];

const RadioButton = (props: Props) => {
    const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
    return (
        <>
            <RadioGroup
                value={selectValue}
                onValueChange={(e) => {
                    setSelectValue(() => {
                        alert(e);
                        return e;
                    });
                }}
            >
                {productStatusData.map((productStatusItem, index) => {
                    return (
                        <div className="flex items-center space-x-4" key={productStatusItem.id}>
                            <RadioGroupItem value={productStatusItem.value} id={productStatusItem.id} />
                            <Label className="w-[150px] " htmlFor={productStatusItem.id}>
                                <b>{productStatusItem.title}</b>
                            </Label>
                            <Label htmlFor={productStatusItem.id}>{productStatusItem.desc}</Label>
                        </div>
                    );
                })}
            </RadioGroup>
            <h1>{selectValue !== undefined ? '선택값: ' + selectValue : null}</h1>
        </>
    );
};

export default RadioButton;
