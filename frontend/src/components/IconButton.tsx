import React, { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  color?: 'primary' | 'github' | 'red';
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  onClick?: (e: any) => void;
}

export function IconButton({
  children,
  color,
  isLoading,
  className,
  disabled,
  size,
  onClick,
}: IconButtonProps): JSX.Element {
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
      type="button"
      className={`rounded-lg flex justify-center items-center transition-all p-1.5 ${
        size === 'small' ? 'h-7 w-7' : 'h-10 w-10'
      } ${getButtonColor()} ${className} ${
        isDisabled && 'opacity-60 cursor-not-allowed'
      }`}
      disabled={isDisabled}
      onClick={e => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
}
