'use client';

import { HeadText } from '../texts/HeadText';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionWrapperProps {
    className?: string;
    titleInfo?: { text: string; textClass: string };
    children?: ReactNode;
}

const SectionWrapper = ({ className, titleInfo, children }: SectionWrapperProps) => {
    return (
        <>
            <div className={cn('mt-30', className)}>
                {titleInfo && (
                    <HeadText size="xl" className={titleInfo.textClass}>
                        <b>{titleInfo.text}</b>
                    </HeadText>
                )}
                {children && children}
            </div>
        </>
    );
};

export default SectionWrapper;
