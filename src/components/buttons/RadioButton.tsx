'use client';

import { useState } from 'react';

type Props = {};

const RadioButton = (props: Props) => {
    const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
    return (
        <>
            {/* <RadioGroup
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
            <h1>{selectValue !== undefined ? '선택값: ' + selectValue : null}</h1> */}
        </>
    );
};

export default RadioButton;
