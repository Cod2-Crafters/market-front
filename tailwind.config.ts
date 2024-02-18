import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        // 컬러 재정의, 존재하는 컬러만 사용함 (인텔리센스에 영향)
        colors: {
            transparent: 'transparent',
            currentColor: 'currentColor',
            black: '#000',
            white: '#fff',
            // 커스텀 컬러 모음
            primary: {
                DEFAULT: '#0a790c',
            },
            secondary: {
                DEFAULT: '#75cb76',
            },

            //  기본 컬러모음 (사용 가능, 이외 사용 불가)
            indigo: colors.indigo,
            orange: colors.orange,
            red: colors.red,
            zinc: colors.zinc,
            neutral: colors.neutral,
        },
        opacity: {
            '0': '0',
            '20': '0.2',
            '40': '0.4',
            '60': '0.6',
            '80': '0.8',
            '100': '1',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            screens: {
                lg: '1050px',
                // => @media (min-width: 992px) { ... }
            },
        },
    },
    plugins: [],
};
export default config;
