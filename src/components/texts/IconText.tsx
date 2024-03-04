import Icon from '../icons/Icon';

import { cn } from '@/lib/utils';
import { IconifyIcon } from '@iconify/react';

interface IIconText extends React.HTMLProps<HTMLParagraphElement> {
    icon: IconifyIcon | string;
    isError?: boolean;
    isHidden: boolean;
}

const IconText = ({ icon, className, isHidden, children }: IIconText) => {
    return (
        <p className={cn('visible text-error', { [`invisible`]: isHidden == true }, className)}>
            <Icon icon={icon} />
            {children}
        </p>
    );
};

export default IconText;
