'use client';

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode
} from 'react';

export type ButtonVariants =
  | 'secondary'
  | 'success'
  | 'primary'
  | 'outline'
  | 'warning'
  | 'danger'
  | 'invert'
  | 'light'
  | 'dark';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  className?: string;
  outline?: boolean;
  icon?: ReactNode;
  title?: string;
}

const Button = ({
  variant = 'primary',
  className = '',
  size = 'md',
  children,
  onClick,
  outline,
  title,
  icon
}: ButtonProps) => {
  return (
    <button
      className="inline-block bg-gradient-to-r from-[#4126E8] to-[#7B5CF8] bg-clip-text text-sm font-semibold text-transparent"
      onClick={onClick && onClick}
    >
      {title && <span>{title}</span>}
      {icon ? icon : null}
    </button>
  );
};

export default Button;
