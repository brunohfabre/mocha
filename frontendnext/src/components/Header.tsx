import {
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  HStack,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export function Header(): JSX.Element {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Flex
      minH="56px"
      w="100%"
      position="sticky"
      top="0"
      bg="white"
      px="4"
      align="center"
      justify="space-between"
      shadow="xs"
      zIndex="995"
    >
      <HStack>{/* <Text>Notes</Text> */}</HStack>

      {!!user && (
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar name={user.name} size="sm" />
              <Text>{user.name}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem color="red.500" onClick={signOut}>
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
