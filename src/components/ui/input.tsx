import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    headcomponent?: React.ReactNode;
    tailcomponent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <>
            <div
                className={cn(
                    'flex flex-row items-center justify-start rounded-md border border-gray-50 px-8 py-4 text-md focus-within:border-secondary hover:border-secondary',
                    { [`bg-gray-70`]: props.disabled == true },
                    className
                )}
            >
                {props.headcomponent}
                <input
                    type={type}
                    className={cn(
                        'placeholder:text-muted-foreground w-full file:border-0 file:bg-transparent file:text-md file:font-medium focus-visible:outline-none disabled:cursor-not-allowed ',
                        props.headcomponent != null ? 'pl-5' : '',
                        props.tailcomponent != null ? 'pr-5' : ''
                    )}
                    ref={ref}
                    {...props}
                />
                {props.tailcomponent}
            </div>
        </>
    );
});
Input.displayName = 'Input';

export { Input };
