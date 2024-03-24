import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'disabled:opacity-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-0 bg-primary text-white focus-visible:outline-none ',
        outline:
          'border border-solid border-black hover:border-transparent hover:bg-secondary hover:text-black focus-visible:outline-none',
        // destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
        // secondary: 'text-secondary-foreground bg-secondary hover:bg-secondary/80',
        // ghost: 'hover:bg-accent hover:text-accent-foreground',
        // link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-8 py-2',
        full: 'w-full py-8',
        lg: 'px-16 py-4',
        // sm: 'h-9 px-3 rounded-md',
        // lg: 'h-11 rounded-md px-8',
        // icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
