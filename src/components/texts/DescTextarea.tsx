'use client';

import TextLengthDisplay from '../textfield/TextLengthDisplay';
import { Textarea } from '../ui/textarea';

import { cn } from '@/lib/utils';
import { ReactNode, useRef, useState } from 'react';

interface IDescTextarea {
    placeholderComp?: ReactNode;
    rows?: number;
    isError?: boolean;
}

const DescTextarea = ({ placeholderComp, rows = 5, isError = false }: IDescTextarea) => {
    const [isDescTextVisible, setIsDescTextVisible] = useState<boolean>(true);
    const refTextArea = useRef<HTMLTextAreaElement>(null);
    const [textAreaText, setTextAreaText] = useState('');
    const MAX_TEXTAREA_LENGTH = 4000;

    return (
        <>
            <div className={cn('relative h-[150px] rounded-lg bg-white')}>
                <Textarea
                    ref={refTextArea}
                    rows={rows}
                    className={cn('absolute block h-full  text-lg', {
                        'border-primary focus-within:border-primary hover:border-primary': isError == false,
                        'border-error focus-within:border-error hover:border-error': isError == true,
                    })}
                    value={textAreaText}
                    onChange={(event) => {
                        setTextAreaText(event.target.value);
                    }}
                    onKeyUp={(event) => {
                        if (event.currentTarget.value.length > 0) {
                            setIsDescTextVisible(() => false);
                        } else {
                            setIsDescTextVisible(() => true);
                        }
                    }}
                    maxLength={MAX_TEXTAREA_LENGTH}
                />
                <div
                    // 조건부별 태그 렌더링을 통해 재렌더링하여 placeholder div를 보여주는 것은 처리속도가 느리므로 className을 통해 조건별 스타일로 대신할 수 있다.
                    className={cn('absolute left-0 top-0 h-full px-4 py-2', {
                        visible: isDescTextVisible === true,
                        invisible: isDescTextVisible === false,
                    })}
                    onClick={(event) => {
                        if (refTextArea.current !== null) {
                            refTextArea.current.focus();
                        }
                    }}
                >
                    {placeholderComp}
                </div>
            </div>
            <TextLengthDisplay
                mode="block"
                position="right"
                textLength={textAreaText.length}
                maxLength={MAX_TEXTAREA_LENGTH}
            ></TextLengthDisplay>
        </>
    );
};

export default DescTextarea;
