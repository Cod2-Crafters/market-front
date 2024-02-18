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
        spacing: {
            none: '0',
            '1': '0.1rem',
            '2': '0.2rem',
            '4': '0.4rem',
            '5': '0.5rem',
            '0.8': '0.8rem',
            '10': '1.0rem',
            '12': '1.2rem',
            '15': '1.5rem',
            '20': '2.0rem',
            '22': '2.2rem',
            '25': '2.5rem',
            '27': '2.7rem',
            '30': '3.0rem',
            '36': '3.6rem',
            '48': '4.8rem',
            '96': '9.6rem',
        },
        fontSize: {
            base: '1.4rem' /* default dsize, same md */,
            sm: '1.2rem',
            md: '1.4rem',
            lg: '1.6rem',
            xl: '1.8rem',
            '2xl': '2.4rem',
            '3xl': '3.6rem',
            '4xl': '4.8rem',
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
