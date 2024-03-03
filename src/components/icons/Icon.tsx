'use client';

import { cn } from '@/lib/utils';
import { Icon as Iconfy, IconProps } from '@iconify/react';

// iconfy-icon props 받아 icon 표시

const Icon = ({ className, icon, width, height }: IconProps) => {
    return (
        <>
            <Iconfy className={cn('inline-block', className)} icon={icon} width={width} height={height} />
        </>
    );
};

export default Icon;
