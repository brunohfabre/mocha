import { Flex, Text } from '@chakra-ui/react';

import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export default function Home(): JSX.Element {
  return (
    <Flex h="100vh">
      <Sidebar />

      <Flex flexDir="column" w="100%">
        <Header />
        <Text>home page</Text>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'mocha.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
