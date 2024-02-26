import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        // 컬러 재정의, 존재하는 컬러만 사용함 (인텔리센스에 영향)
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#000',
            white: '#fff',
            // 커스텀 컬러 모음
            primary: {
                DEFAULT: 'rgb(var(--primary))',
                foreground: 'rgb(var(--primary-foreground))',
            },
            secondary: {
                DEFAULT: 'hsl(var(--secondary))',
                foreground: 'hsl(var(--secondary-foreground))',
            },
            // primary: {
            //     // DEFAULT: '#0a790c',
            //     DEFAULT: 'rgb(var(--primary) / 255)',
            //     foreground: 'rgb(var(--foreground) / 255)',
            // },
            // secondary: {
            //     // DEFAULT: '#75cb76',
            //     DEFAULT: 'rgb(var(--secondary))',
            //     foreground: 'rgb(var(--secondary-foreground))',
            // },
            gray: {
                '10': '#3A3A3A',
                '20': '#5A5A5A',
                '30': '#858585',
                '40': '#ABABAB',
                '50': '#C3C3C3',
                '60': '#D9D9D9',
                '70': '#E2E2E2',
                '80': '#E8E8E8',
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
            '8': '0.8rem',
            '10': '1.0rem',
            '12': '1.2rem',
            '15': '1.5rem',
            '16': '1.6rem',
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
            colors: {
                primary: {
                    DEFAULT: 'rgb(var(--primary))',
                    foreground: 'rgb(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary))',
                    foreground: 'rgb(var(--secondary-foreground))',
                },
                background: 'rgb(var(--background))',
                foreground: 'rgb(var(--foreground))',
                accent: {
                    DEFAULT: 'rgb(var(--accent))',
                    foreground: 'rgb(var(--accent-foreground))',
                },
                input: 'rgb(var(--input))',
                ring: {
                    DEFAULT: 'rgb(var(--ring))',
                },
                // destructive: {
                //     DEFAULT: 'hsl(var(--destructive))',
                //     foreground: 'hsl(var(--destructive-foreground))',
                // },
                // muted: {
                //     DEFAULT: 'hsl(var(--muted))',
                //     foreground: 'hsl(var(--muted-foreground))',
                // },

                // popover: {
                //     DEFAULT: 'hsl(var(--popover))',
                //     foreground: 'hsl(var(--popover-foreground))',
                // },
                // card: {
                //     DEFAULT: 'hsl(var(--card))',
                //     foreground: 'hsl(var(--card-foreground))',
                // },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            screens: {
                lg: '1050px',
                // => @media (min-width: 992px) { ... }
            },
            // borderRadius: {
            //     lg: 'var(--radius)',
            //     md: 'calc(var(--radius) - 2px)',
            //     sm: 'calc(var(--radius) - 4px)',
            // },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [],
} satisfies Config;
export default config;
