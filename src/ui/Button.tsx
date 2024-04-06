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
  disabled?: boolean;
  outline?: boolean;
  icon?: ReactNode;
  title?: string;
}

const Button = ({
  variant = 'primary',
  className = '',
  size = 'md',
  children,
  disabled,
  onClick,
  outline,
  title,
  icon
}: ButtonProps) => {
  return (
    <button
      className="rounded-lg bg-[#EBE8FD] px-4 py-2 text-center"
      onClick={onClick && onClick}
      disabled={disabled}
    >
      {title && <span>{title}</span>}
      {icon ? icon : null}
    </button>
  );
};

export default Button;
