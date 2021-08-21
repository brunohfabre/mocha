import { ButtonHTMLAttributes } from 'react';

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
  function getButtonColor(): string {
    if (color === 'primary') {
      if (disabled) {
        return 'text-white bg-purple-500 hover:bg-purple-500';
      }

      return 'text-white bg-purple-500 hover:bg-purple-400';
    }

    if (color === 'github') {
      if (disabled) {
        return 'text-white bg-gray-800 hover:bg-gray-800';
      }

      return 'text-white bg-gray-800 hover:bg-gray-700';
    }

    if (color === 'red') {
      if (disabled) {
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
        disabled && 'opacity-60 cursor-not-allowed'
      }`}
      disabled={disabled}
    >
      {isLoading ? (
        <svg
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin w-5 h-5"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2Z"
            fill="white"
            fillOpacity="0.32"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 11C0 4.92487 4.92487 0 11 0V2C6.02944 2 2 6.02944 2 11H0Z"
            fill="white"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
