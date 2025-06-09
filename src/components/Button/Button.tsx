import React from 'react';
import Icon from '../Icon/Icon';
import type { ButtonProps, Variant, Size, Shape } from '@/types/components';
import type { BaseProps, WithChildren, WithLoading, WithDisabled, WithOnClick } from '@/types/common';

/**
 * Button component that supports different variants, sizes, and shapes.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * <Button variant="ghost" size="sm" icon={<Icon name="download" />}>
 *   Download
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  shape = 'default',
  icon,
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
    ghost: 'hover:bg-gray-100 focus:ring-gray-200'
  };

  const sizeStyles: Record<Size, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
    icon: 'p-2'
  };

  const shapeStyles: Record<Shape, string> = {
    default: 'rounded-md',
    circle: 'rounded-full'
  };

  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${shapeStyles[shape]}
    ${className}
  `;

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon name="loading" className="animate-spin" />
      ) : (
        <>
          {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button }; 