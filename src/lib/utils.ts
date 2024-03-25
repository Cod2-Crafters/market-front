import type { ClassValue } from 'clsx';

import { RootState } from '@/store/store';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const getLoginMemberInfo = () => {
    return useSelector((state: RootState) => state.memeberinfo) || null;
};
