'use client';

import { Textarea } from '../ui/textarea';

import { cn } from '@/lib/utils';
import { ReactNode, useRef, useState } from 'react';

interface IDescTextarea {
    placeholderComp?: ReactNode;
}

const DescTextarea = ({ placeholderComp }: IDescTextarea) => {
    const [isDescTextVisible, setIsDescTextVisible] = useState<boolean>(true);
    const refTextArea = useRef<HTMLTextAreaElement>(null);
    const [textAreaText, setTextAreaText] = useState('');

    return (
        <>
            <div className="relative h-[150px] bg-white">
                <Textarea
                    ref={refTextArea}
                    rows={6}
                    className="absolute block h-full text-lg"
                    value={textAreaText}
                    onChange={(event) => {
                        setTextAreaText(() => {
                            return event.target.value;
                        });
                    }}
                    onKeyUp={(event) => {
                        if (event.currentTarget.value.length > 0) {
                            setIsDescTextVisible(() => false);
                        } else {
                            setIsDescTextVisible(() => true);
                        }
                    }}
                />
                <div
                    // 조건부별 태그 렌더링을 통해 재렌더링하여 placeholder div를 보여주는 것은 처리속도가 느리므로 className을 통해 조건별 스타일로 대신할 수 있다.
                    className={cn('top-0 left-0 absolute h-full p-4', {
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
        </>
    );
};

export default DescTextarea;
