import { Flex, Text, Modal, ModalBody } from '@chakra-ui/react';

import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export default function Home(): JSX.Element {
  const [isOpen, setIsOpen] = useState();

  return (
    <>
      <Modal isOpen={isOpen} />

      <Flex h="100vh">
        <Sidebar />

        <Flex flexDir="column" w="100%">
          <Header />
          <Text>home page</Text>
        </Flex>
      </Flex>
    </>
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
