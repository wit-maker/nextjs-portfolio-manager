import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#1a1a1a] text-[#ffffff] hover:bg-[#333333]',
        destructive: 'bg-[#dc2626] text-[#ffffff] hover:bg-[#b91c1c]',
        outline: 'border border-[#e5e5e5] bg-transparent hover:bg-[#f5f5f5] text-[#1a1a1a]',
        secondary: 'bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5]',
        ghost: 'hover:bg-[#f5f5f5] text-[#1a1a1a]',
        link: 'text-[#1a1a1a] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };