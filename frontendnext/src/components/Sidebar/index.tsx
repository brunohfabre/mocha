import { useEffect, useState } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logoBlackImage from '../../assets/logo-black.svg';

import { Item } from './Item';

export function Sidebar(): JSX.Element {
  const router = useRouter();

  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const route = router.pathname;

    if (route.length > 1) {
      setIsMinimized(true);
    }
  }, [router.pathname]);

  return (
    <Flex
      minW={isMinimized ? '64px' : '240px'}
      h="100vh"
      position="sticky"
      top="0"
      left="0"
      shadow="xs"
      zIndex="1000"
      bg="white"
      flexDir="column"
    >
      <Box pl="4" h="56px">
        <Image src={logoBlackImage} alt="Mocha logo" width="40" height="56" />
      </Box>

      <Stack>
        <Item>{isMinimized ? 'D' : 'Dashboard'}</Item>
        <Item>{isMinimized ? 'N' : 'Notes'}</Item>
      </Stack>
    </Flex>
  );
}
