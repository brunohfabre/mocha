import React from 'react';

interface SpinProps {
  fill?: 'white' | 'black';
}

export function Spin({ fill = 'white' }: SpinProps): JSX.Element {
  return (
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
        fill={fill}
        fillOpacity="0.32"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11C0 4.92487 4.92487 0 11 0V2C6.02944 2 2 6.02944 2 11H0Z"
        fill={fill}
      />
    </svg>
  );
}
