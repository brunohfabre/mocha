import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { DeepMap, FieldError, FieldValues } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label: string;
  errors: DeepMap<FieldValues, FieldError>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, flex, type, errors, ...rest },
  ref,
) => {
  const error = errors[name];

  return (
    <FormControl isInvalid={!!error} flex={flex}>
      {label && <FormLabel>{label}</FormLabel>}

      <ChakraInput
        ref={ref}
        name={name}
        type={type}
        variant="filled"
        focusBorderColor="pink.500"
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
