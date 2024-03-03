'use client';

import Icon from '../icons/Icon';
import IconText from '../texts/IconText';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HTMLAttributes, useState } from 'react';

export interface ProductFormNameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    headcomponent?: React.ReactNode;
    tailcomponent?: React.ReactNode;
    className?: string;
    placeholderText?: string;
}

const ProductFormNameInput = ({ className, placeholderText = '상품명을 입력해주세요' }: ProductFormNameInputProps) => {
    const [text, setText] = useState<string>('');
    const validator = (text: string) => {
        if (text.length < 2 && text.length != 0) {
            return { message: '상품명을 입력해주세요.', isError: true }; // error
        }
        return { message: '오류명', isError: false }; // no error
    };

    const errorData = validator(text);
    const maxLength = 40;

    return (
        <>
            <div className={cn('flex items-center justify-between', className)}>
                <Input
                    className={cn('')}
                    type="text"
                    placeholder={placeholderText}
                    value={text}
                    onChange={(event) => {
                        setText(event.currentTarget.value);
                    }}
                    isError={errorData.isError}
                    maxLength={maxLength}
                    tailcomponent={
                        0 < text.length && (
                            <button
                                onClick={() => {
                                    setText('');
                                }}
                            >
                                <Icon icon="zondicons:close-solid" />
                            </button>
                        )
                    }
                />

                <div className="ml-15 text-right">
                    {text.length}/{maxLength}
                </div>
            </div>

            <IconText className="text-error" icon={'carbon:error'} isHidden={errorData.isError == false}>
                {errorData.message}
            </IconText>
            {/* <p className={cn('visible', { [`invisible`]: errorData.isError == false })}>
                <Icon icon="carbon:error" /> <span>{errorData.message}</span>
            </p> */}
        </>
    );
};

type DummyProps = HTMLAttributes<HTMLDivElement> & {};

function Test({ children }: DummyProps) {
    return <div>{children}</div>;
}

ProductFormNameInput.Test = Test;

export { ProductFormNameInput, Test };
