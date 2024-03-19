import type { Config } from 'tailwindcss'
import { screens } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      xs: '375px',
      ...screens,
    },

    spacing: {
      '0': '0px',
      '1': '1px',
      '2': '0.125rem',
      '4': '0.25rem',
      '6': '0.375rem',
      '8': '0.5rem',
      '10': '0.625rem',
      '12': '0.75rem',
      '14': '0.875rem',
      '16': '1rem',
      '20': '1.25rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '32': '2rem',
      '36': '2.25rem',
      '40': '2.5rem',
      '44': '2.75rem',
      '48': '3rem',
      '56': '3.5rem',
      '64': '4rem',
      '72': '4.5rem',
      '80': '5rem',
      '92': '5.75rem',
      '96': '6rem',
      '112': '7rem',
      '128': '8rem',
      '144': '9rem',
      '160': '10rem',
      '176': '11rem',
      '192': '12rem',
      '208': '13rem',
      '224': '14rem',
      '240': '15rem',
      '256': '16rem',
      '288': '18rem',
      '320': '20rem',
      '352': '22rem',
      '384': '24rem',
    },

    fontSize: {
      '10': ['0.625rem', '1rem'],
      '12': ['0.75rem', '1rem'],
      '14': ['0.875rem', '1.25rem'],
      '16': ['1rem', '1.5rem'],
      '18': ['1.125rem', '1.75rem'],
      '20': ['1.25rem', '1.75rem'],
      '24': ['1.5rem', '2rem'],
      '30': ['1.875rem', '2.25rem'],
      '36': ['2.25rem', '2.5rem'],
      '48': ['3rem', '1'],
      '60': ['3.75rem', '1'],
    },

    borderRadius: {
      none: '0',
      full: '9999px',
      '2': '0.125rem',
      '4': '0.25rem',
      '8': '0.5rem',
      '12': '0.75rem',
      '16': '1rem',
      '24': '1.5rem',
    },

    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      slate: colors.slate,
      orange: colors.orange,
      blue: colors.blue,
      green: colors.green,

      facebook: '#0088cb',
      google: '#f14336',

      // Other colors
      primary: '#e87722',
      red: '#d0011b',
      gray: {
        '50': '#edeff0',
        '100': '#b3b6b8',
        '200': '#dbdfe1',
        '300': '#8b8e8f',
        '400': '#636566',
      },
    },
  },
  plugins: [],
}
export default config
