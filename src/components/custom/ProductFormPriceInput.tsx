'use client';

import ToggleButton from '../buttons/ToggleButton';
import Icon from '../icons/Icon';
import IconText from '../texts/IconText';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// 무료나눔 클릭별 색상 변경 O
// 가격 100원 미만 추가 태그 표시
// 1,000 comma 적용
// disabled, enabled 값 별로 다른 배경 적용

interface IPriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ProductFormPriceInput = ({ className, ...props }: IPriceInputProps) => {
    const [text, setText] = useState<string>('');
    const [isDisabled, setDisabled] = useState<boolean>(false);

    const validator = (text: string) => {
        if (0 < text.length && Number(text) < 100) {
            return { message: '가격을 100원 이상 입력해주세요', isError: true }; // error
        }
        return { message: '오류명', isError: false }; // no error
    };

    const errorData = validator(text);

    return (
        <>
            <Input
                className={cn('', className)}
                onInput={(event) => {
                    console.log('#d', event.currentTarget.value.replaceAll(/[^0-9.]/g, ''));

                    const targetValue = event.currentTarget.value;

                    if (0 < targetValue.length) {
                        const onlyNumberText: string = targetValue.replaceAll(/[^0-9]/g, '');
                        setText(Number(onlyNumberText).toLocaleString('en-US'));
                    } else {
                        setText('');
                    }
                }}
                // onChange={(event) => {}}
                type="text"
                placeholder="판매 가격"
                value={text}
                disabled={isDisabled}
                isError={errorData.isError}
                tailcomponent={
                    <ToggleButton
                        onToggle={(isAfterActiveState) => {
                            if (isAfterActiveState == false) {
                                setDisabled(false);
                                setText('');
                            } else {
                                setDisabled(true);
                                setText('0');
                            }
                        }}
                        roundBorderStyle="round"
                        text="무료나눔"
                        tailComponent={<Icon icon="icon-park-outline:check-one" />}
                    ></ToggleButton>
                }
            />
            <IconText icon="carbon:error" isHidden={errorData.isError == false} isError={errorData.isError}>
                {errorData.message}
            </IconText>
        </>
    );
};

export default ProductFormPriceInput;
