'use client';

import { cn } from '@/lib/utils';
import { Icon as Iconify, IconProps } from '@iconify/react';
import ArrowIcon from 'public/images/advertiesment/arrow.svg';

// iconfy-icon props 받아 icon 표시
const Icon = ({ className, icon, width = 0, height = 0 }: IconProps) => {
    function renderIcon(icon: string) {
        switch (icon) {
            case 'arrow': {
                return <ArrowIcon className={cn('inline-block', className)} width={width} height={height} />;
            }

            default: {
                return <Iconify className={cn('inline-block', className)} icon={icon} width={width} height={height} />;
            }
        }
    }

    return <>{renderIcon(icon as string)}</>;
};

export default Icon;
