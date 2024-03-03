import { cn } from '@/lib/utils';
import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'placeholder:text-muted-foreground disabled:opacity-50 flex w-full rounded-md border border-solid border-gray-50 bg-transparent px-4 py-2 text-sm hover:border-black focus-visible:outline-none disabled:cursor-not-allowed',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
