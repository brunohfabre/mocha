import { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

interface Props {
  name: string;
  label?: string;
  className?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Input({
  name,
  label,
  className,
  ...rest
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const isErrored = !!error;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className={`flex flex-col relative ${className}`}>
      {label && (
        <label htmlFor={fieldName} className="text-sm text-gray-500 mb-1">
          {label}
        </label>
      )}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        className={`h-10 bg-gray-100 rounded-lg px-4 border outline-none focus:ring-4 focus:ring-purple-200 focus:bg-white focus:border focus:border-purple-300 transition-all ${
          isErrored && 'border-red-500 bg-red-50'
        }`}
        placeholder={label}
      />

      {isErrored && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
