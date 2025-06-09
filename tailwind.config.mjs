/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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