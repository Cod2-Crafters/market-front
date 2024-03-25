import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

export interface HintInputProps extends React.HTMLProps<HTMLInputElement> {
    caption: string;
    headcomponent?: React.ReactNode;
    tailcomponent?: React.ReactNode;
    height?: string;
    isError?: boolean;
    inputType: 'text' | 'onlytext' | 'phone' | 'onlynumber';
    children?: React.ReactNode;
    value: string;
}

type tt = React.RefObject<HTMLInputElement>;

const HintInput = React.forwardRef<HTMLInputElement, HintInputProps>(
    (
        {
            className,
            type,
            children,
            caption,
            headcomponent,
            tailcomponent,
            inputType = 'text',
            isError = false,
            value,
            ...props
        },
        ref
    ) => {
        const [isFocus, setIsFocus] = React.useState(false);
        const inputRef = ref || useRef<HTMLInputElement>(null); // React.RefObject<HTMLInputElement>

        return (
            <>
                <div
                    className={cn(
                        `relative flex min-h-[58px] w-full flex-row items-center justify-start rounded-md border border-black px-8 py-4 focus-within:border-secondary hover:border-secondary focus-visible:border-secondary `,
                        { [`bg-gray-70`]: props.disabled == true },
                        {
                            [`border-error focus-within:border-error hover:border-error focus-visible:border-error`]:
                                isError == true,
                        },
                        className
                    )}
                >
                    {children}
                    {headcomponent}
                    <p
                        className={cn('pointer-events-none absolute w-full text-xl text-gray-30 transition-transform', {
                            [`-translate-y-20 text-sm ${isError ? 'text-error' : 'text-primary'} `]:
                                isFocus == true || 0 < (value as string)?.length, // md
                        })}
                    >
                        {caption}
                    </p>

                    <input
                        ref={ref}
                        type={type}
                        className={cn(
                            'placeholder:text-muted-foreground disabled:cursor-not-allowe pa border-2 border-none border-red-500 file:border-0 file:bg-transparent file:text-md file:font-medium focus-visible:outline-none ',
                            headcomponent != null ? 'pl-5' : 'w-full',
                            tailcomponent != null ? 'pr-5' : 'w-full',
                            {
                                'placeholder:text-transparent': isFocus == false,
                                'text-2xl': type == 'password',
                            }
                        )}
                        {...props}
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                            setIsFocus(true);
                            props.onFocus?.(event);
                        }}
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                            setIsFocus(false);
                            props.onBlur?.(event);
                        }}
                        onChange={(event) => {
                            const beforeChangeTextValue = event.currentTarget.value;
                            console.log('changevalue:', beforeChangeTextValue);
                            let regex;
                            if (inputType == 'onlynumber') {
                                regex = /[^0-9]$/;
                            } else if (inputType == 'onlytext') {
                                regex = /[^ㄱ-ㅎ가-힣a-zA-Z]$/;
                            }
                            if (regex && regex.test(beforeChangeTextValue) == true) {
                                event.preventDefault();
                                //event.currentTarget.value = beforeChangeTextValue.replace(regex, '');
                                return false;
                            }

                            {
                                // 부모의 onChange 호출
                                props.onChange?.(event);
                            }
                        }}
                    />
                    {tailcomponent}
                </div>
            </>
        );
    }
);
HintInput.displayName = 'HintInput';

export { HintInput };
