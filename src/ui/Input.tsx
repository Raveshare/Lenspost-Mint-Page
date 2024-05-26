'use client';

import { FC } from 'react';

interface InputProps {
  handleQuantity: (e: any) => void;
  isInputError?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
}

const Input: FC<InputProps> = ({
  handleQuantity,
  className = '',
  isInputError,
  placeholder,
  type
}) => {
  return (
    <input
      className={`w-16 rounded-md bg-slate-100 p-1 text-center outline-none ring-2 ${isInputError ? 'ring-red-500' : 'ring-blue-800'} focus:ring-${isInputError ? 'red' : 'blue'}-500`}
      onChange={handleQuantity}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
