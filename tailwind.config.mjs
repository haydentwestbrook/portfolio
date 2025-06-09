/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        'text-light': 'var(--color-text-light)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
        sm: 'var(--font-size-sm)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        bold: 'var(--font-weight-bold)',
      },
      spacing: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        6: 'var(--spacing-6)',
        8: 'var(--spacing-8)',
        12: 'var(--spacing-12)',
        16: 'var(--spacing-16)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-text)',
            a: {
              color: 'var(--color-accent)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h2: {
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h4: {
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              marginTop: '2em',
              marginBottom: '1em',
            },
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.75',
            },
            ul: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              paddingLeft: '1.5em',
            },
            ol: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              paddingLeft: '1.5em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            blockquote: {
              marginTop: '2em',
              marginBottom: '2em',
              paddingLeft: '1.5em',
              borderLeftWidth: '0.25em',
              borderLeftColor: 'var(--color-primary)',
              fontStyle: 'italic',
            },
            code: {
              color: 'var(--color-accent)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              backgroundColor: 'var(--color-background)',
            },
            pre: {
              marginTop: '2em',
              marginBottom: '2em',
              backgroundColor: 'var(--color-secondary)',
              color: 'white',
              padding: '1em',
              borderRadius: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 