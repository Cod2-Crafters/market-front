'use client';

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const toggleVariants = cva(
    'hover:bg-muted hover:text-muted-foreground disabled:opacity-50 inline-flex items-center justify-center text-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white',
    {
        variants: {
            variant: {
                default:
                    'rounded-lg border-2 border-solid border-gray-30 bg-red-500 bg-transparent text-lg outline-none',
                // outline: 'border bg-transparent hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                default: 'px-25 py-5',
                md: 'px-25 py-5',
                // sm: 'h-9 px-5',
                // lg: 'h-11 px-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const Toggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
