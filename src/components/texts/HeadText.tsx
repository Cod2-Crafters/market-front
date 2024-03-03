import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';

type TDefaultHead = Omit<React.InputHTMLAttributes<HTMLHeadingElement>, 'size'>; // 기존 size 속성 제거 후 재정의
interface HeadTextProps extends TDefaultHead {
    size: 'lg' | 'sm';
    children: ReactNode;
}

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;
type HeadingTagType = {
    [K in IntrinsicElementsKeys]: React.FC<React.InputHTMLAttributes<HTMLHeadingElement>>;
};

// 사이즈별 조정 가능
const headTextVariants = cva('text-gray-30 [&>b]:text-lg', {
    variants: {
        size: {
            xl: 'text-xl',
            lg: 'text-lg',
            sm: 'text-sm',
        },
        default: {
            size: 'large',
        },
    },
});

const tagVariants = {
    '2xl': 'h1',
    xl: 'h2',
    lg: 'h2',
    sm: 'h3',
};

const HeadText: React.FC<HeadTextProps> = ({ className, size, children }: HeadTextProps) => {
    const HeadingTag = `${tagVariants[size]}` as keyof HeadingTagType;
    return <HeadingTag className={cn(headTextVariants({ size }), className)}>{children}</HeadingTag>;
};

export { HeadText, headTextVariants };
