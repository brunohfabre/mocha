import { ButtonHTMLAttributes } from 'react';

import { Spin } from './Spin';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit';
  color?: 'primary' | 'github' | 'red';
  isLoading?: boolean;
}

export function Button({
  type,
  color,
  className,
  children,
  isLoading,
  disabled,
  ...rest
}: ButtonProps): JSX.Element {
  const isDisabled = isLoading || disabled;

  function getButtonColor(): string {
    if (color === 'primary') {
      if (isDisabled) {
        return 'text-white bg-purple-500 hover:bg-purple-500';
      }

      return 'text-white bg-purple-500 hover:bg-purple-400';
    }

    if (color === 'github') {
      if (isDisabled) {
        return 'text-white bg-gray-800 hover:bg-gray-800';
      }

      return 'text-white bg-gray-800 hover:bg-gray-700';
    }

    if (color === 'red') {
      if (isDisabled) {
        return 'text-white bg-red-500 hover:bg-red-500';
      }

      return 'text-white bg-red-500 hover:bg-red-400';
    }

    return 'bg-gray-100 hover:bg-gray-200';
  }

  return (
    <button
      type={type}
      {...rest}
      className={`rounded-lg h-10 px-4 flex justify-center items-center gap-2 transition-all ${getButtonColor()} ${className} ${
        isDisabled && 'opacity-60 cursor-not-allowed'
      }`}
      disabled={isDisabled}
    >
      {isLoading ? <Spin /> : children}
    </button>
  );
}
