import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));

    //'py-4 px-2'

    twMerge('py-4 px-2 bg-red-500', 'py-10 px-10');
}
