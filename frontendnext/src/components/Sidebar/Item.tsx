import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ItemProps {
  children: ReactNode;
}

export function Item({ children }: ItemProps): JSX.Element {
  return (
    <Flex as="button">
      <Text>{children}</Text>
    </Flex>
  );
}
