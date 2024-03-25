import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    isError?: boolean;
    headcomponent?: React.ReactNode;
    tailcomponent?: React.ReactNode;
    children?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, children, headcomponent, tailcomponent, isError = false, ...props }, ref) => {
        return (
            <>
                <div
                    className={cn(
                        'flex w-full flex-row items-center justify-start rounded-md border border-gray-50 px-8 py-4 text-md focus-within:border-secondary hover:border-secondary focus-visible:border-secondary',
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
                    <input
                        type={type}
                        className={cn(
                            'placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-md file:font-medium focus-visible:outline-none disabled:cursor-not-allowed ',
                            headcomponent != null ? 'pl-5' : 'w-full',
                            tailcomponent != null ? 'pr-5' : 'w-full'
                        )}
                        ref={ref}
                        {...props}
                    />
                    {tailcomponent}
                </div>
            </>
        );
    }
);
Input.displayName = 'Input';

export { Input };
