import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit';
  color?: 'purple' | 'github';
}

export function Button({
  type,
  color,
  className,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  function getButtonColor(): string {
    if (color === 'purple') {
      return 'text-white bg-purple-500 hover:bg-purple-400';
    }

    if (color === 'github') {
      return 'text-white bg-gray-800 hover:bg-gray-700';
    }

    return 'bg-gray-100 hover:bg-gray-200';
  }
  return (
    <button
      type={type}
      {...rest}
      className={`rounded-lg h-10 flex justify-center items-center gap-2 ${getButtonColor()} ${className}`}
    >
      {children}
    </button>
  );
}
