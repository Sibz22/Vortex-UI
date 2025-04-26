/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: {
          dark: '#080808',
          card: '#111111',
        },
        accent: {
          green: '#4ade80',
          'green-dark': '#22c55e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        float: 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.15) 0%, rgba(8, 8, 8, 0) 70%)',
        'card-gradient': 'linear-gradient(to bottom right, rgba(74, 222, 128, 0.05), rgba(8, 8, 8, 0))',
      },
    },
  },
  plugins: [],
};