import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E6FBA',
          light: '#4FB3D9',
          dark: '#155A99',
          sun: '#F5B919',
          sunDark: '#8B2E1F',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          soft: '#94A3B8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F8FAFC',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #4FB3D9 0%, #1E6FBA 60%, #155A99 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, #EAF6FB 0%, #DCEEF8 60%, #C9E3F3 100%)',
        'cold-gradient':
          'linear-gradient(180deg, #050B1A 0%, #0a1628 40%, #155A99 100%)',
        'warm-gradient':
          'linear-gradient(180deg, #1a0a05 0%, #3a1408 40%, #8B2E1F 100%)',
        'hero-atmosphere':
          'radial-gradient(ellipse at 50% 30%, rgba(79,179,217,0.18) 0%, transparent 60%), linear-gradient(180deg, #050B1A 0%, #0a1628 50%, #050B1A 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-3%)' },
          '100%': { transform: 'translateX(3%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        glow: 'glow 4s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2.2s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
        'drift-slow': 'drift 28s ease-in-out infinite alternate',
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 80s linear infinite',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)',
        cardHover:
          '0 4px 8px rgba(15, 23, 42, 0.06), 0 12px 24px rgba(15, 23, 42, 0.10)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
