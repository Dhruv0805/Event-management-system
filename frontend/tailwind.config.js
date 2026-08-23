/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1440px',
    },
    extend: {
      colors: {
        // Signature identity: warm "ticket stub" amber/coral against deep
        // ink — reads as event/festival, not generic SaaS blue-purple.
        ink: '#0B0E14',
        ember: '#FF8A3D',
        coral: '#FF4D6D',
        teal: '#2AD9C2',

        // Theme-aware semantic tokens driven by CSS variables (index.css)
        // so components never branch logic on theme, only tokens change.
        surface: {
          base: 'var(--color-surface-base)',
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
          overlay: 'var(--color-surface-overlay)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        danger: '#F0475C',
        success: '#2AD9C2',
        warning: '#FFB84D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '54px', fontWeight: '700', letterSpacing: '-0.03em' }],
        'display-lg-mobile': ['32px', { lineHeight: '38px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-md': ['24px', { lineHeight: '30px', fontWeight: '700', letterSpacing: '-0.01em' }],
        'headline-sm': ['19px', { lineHeight: '26px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['15px', { lineHeight: '23px', fontWeight: '400' }],
        'label-md': ['13.5px', { lineHeight: '20px', fontWeight: '600', letterSpacing: '0.01em' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.03em' }],
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
        gutter: '24px',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },
      backdropBlur: {
        glass: '18px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(120deg, #FF8A3D 0%, #FF4D6D 100%)',
        'gradient-radial-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(255,138,61,0.16) 0%, rgba(255,77,109,0) 70%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,138,61,0.15), 0 8px 30px -8px rgba(255,77,109,0.35)',
        'glow-lg': '0 0 40px -6px rgba(255,138,61,0.45)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
};
