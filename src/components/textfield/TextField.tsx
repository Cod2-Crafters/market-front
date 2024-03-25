'use client';

import Icon from '../icons/Icon';
import TextLengthDisplay from './TextLengthDisplay';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    FocusEventHandler,
    ForwardedRef,
    forwardRef,
    HTMLInputTypeAttribute,
    KeyboardEvent,
    KeyboardEventHandler,
    ReactNode,
    SetStateAction,
} from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
    type: HTMLInputTypeAttribute;
    value: string;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
    onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
    setInputText?: Dispatch<SetStateAction<string>>;
    required?: boolean;
    disabled?: boolean;
    variantType: 'productRegisterForm';
    name?: string;
    innerNode?: ReactNode;
    innerNodePosition?: 'start' | 'end';
    isUseClearBtn?: boolean;
    maxLength?: number;
    placeholder?: string;
    isError?: boolean;
    feature: 'displayTextLength' | 'inputPrice' | 'inputHashtag' | 'none';
    children?: ReactNode;
};

const TextField = forwardRef(
    (
        {
            variantType,
            name,
            type,
            value = '',
            onKeyDown,
            onKeyUp,
            onChange,
            onBlur,
            setInputText,
            innerNode = undefined,
            innerNodePosition = 'start',
            isUseClearBtn = true,
            maxLength = 128,
            placeholder = '',
            feature,
            isError = false,
            ...props
        }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const { formState, getFieldState, setValue, control } = useFormContext();

        const variants = {
            input: cva('', {
                variants: {
                    variant: {
                        default: '',
                        productRegisterForm: {
                            'flex-grow': true, // flex layout
                            'text-lg text-black': true, // text-size
                            'ml-4': innerNode && innerNodePosition == 'start',
                            'mr-4': innerNode && innerNodePosition == 'end',
                            // 'border border-solid border-orange-400': false,
                        },
                    },
                },
                defaultVariants: {
                    variant: 'productRegisterForm',
                },
            }),
            outline: cva('', {
                variants: {
                    variant: {
                        default: '',
                        productRegisterForm: {
                            'flex flex-grow items-center': true,
                            'h-[48px] px-10 py-8': true,
                            'border border-solid': true,
                            'rounded-lg border-gray-50': true,
                            'focus-within:border-primary hover:border-primary': isError == false,
                            'focus-within:border-error hover:border-error': isError == true,
                        },
                    },
                },
                defaultVariants: {
                    variant: 'productRegisterForm',
                },
            }),
        };
        //const [text, setText] = useState(value || '');

        //const { text, setText, handleOnChange: handleTextFieldOnChange } = useTextField(value || '');

        const MAX_TEXT_LENGTH = maxLength;

        // const customOnChange = (event: ChangeEvent<HTMLInputElement>, feature: 'inputPrice' | 'none') => {
        //     console.log('level-3 handleKeyChange-1', onChange, '@', event.currentTarget.value);
        //     if (feature == 'inputPrice') {
        //         console.log('price:', event.currentTarget.value);
        //         const inputNumber = Number(event.currentTarget.value.replace(/,/g, '')) || 0;
        //         setText(inputNumber.toLocaleString());
        //     } else {
        //         setText(event.currentTarget.value);
        //     }
        // };

        const setInput = (value: string, isValidateCheck?: boolean) => {
            if (name && formState) {
                setValue(name, value, { shouldValidate: isValidateCheck || true }); // react-hook-form 호환
            } else if (setInputText) {
                setInputText(value); // useState props
            }
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            onChange !== undefined && onChange(event);
            if (!event.isDefaultPrevented()) {
                if (feature == 'inputPrice') {
                    console.log('price:', event.currentTarget.value);
                    const inputNumber = Number(event.currentTarget.value.replace(/,/g, '')) || 0;
                    setInput(inputNumber.toLocaleString());
                } else {
                    setInput(event.currentTarget.value);
                }
            }

            //handleTextFieldOnChange(event, feature);

            //setText(event.currentTarget.value);
            // if (feature == 'inputPrice') {
            //     console.log('price:', event.currentTarget.value);
            //     const inputNumber = Number(event.currentTarget.value.replace(/,/g, '')) || 0;
            //     setText(inputNumber.toLocaleString());
            // } else {
            //     //setText(event.currentTarget.value);
            // }
            //setInputText(event.currentTarget.value);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            onKeyDown !== undefined && onKeyDown(event);
        };

        const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
            onKeyUp !== undefined && onKeyUp(event);
        };

        return (
            <>
                {/* {name} */}
                <div className={variants.outline({ variant: variantType })}>
                    {innerNodePosition == 'start' && innerNode}
                    <input
                        ref={ref}
                        className={variants.input({ variant: variantType })}
                        type={type}
                        value={value}
                        onKeyUp={handleKeyUp}
                        onChange={handleChange}
                        onBlur={onBlur}
                        onKeyDown={handleKeyDown}
                        maxLength={MAX_TEXT_LENGTH}
                        placeholder={placeholder}
                    />
                    {/* <p className="absolute top-0">Label</p> */}
                    {isUseClearBtn == true && (
                        <button
                            className={cn('', {
                                hidden: 0 === value.length,
                                display: 0 < value.length,
                            })}
                            type="button"
                            onClick={(event) => {
                                //setInputText?.('');
                                setInput('', false);
                            }}
                        >
                            <Icon
                                className={cn(`cursor-pointer ${isError ? 'text-error' : 'text-gray-20'}`, {
                                    'mr-4': innerNode && innerNodePosition == 'end',
                                })}
                                icon="zondicons:close-solid"
                                width={24}
                                height={24}
                            />
                        </button>
                    )}
                    {props.children}
                    {innerNodePosition == 'end' && innerNode}
                    {feature == 'displayTextLength' && (
                        <>
                            <TextLengthDisplay
                                position="right"
                                className="w-[60px] text-right"
                                mode="block"
                                maxLength={40}
                                textLength={value.length || 0}
                            />
                        </>
                    )}
                </div>
            </>
        );
    }
);

export default TextField;
