import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
    size: 'big' | 'md';
};

const sizeVariants = cva('text-error', {
    variants: {
        size: {
            big: 'text-lg',
            md: 'text-md',
        },
    },
});

const ErrorText = ({ size, children }: Props) => {
    return children && <p className={cn(sizeVariants({ size }))}>{children}</p>;
};

export default ErrorText;
