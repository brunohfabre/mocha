import { useContext, useState } from 'react';
import {
  Flex,
  Button,
  useToast,
  Grid,
  Text,
  Heading,
  Divider,
  Link,
  UnorderedList,
  ListItem,
  Stack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { parseCookies } from 'nookies';

import { Input } from '../components/Form/Input';

import logoBlackImage from '../assets/logo-black.svg';

import { AuthContext } from '../contexts/AuthContext';

const signInFormSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const { signIn } = useContext(AuthContext);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const [loading, setLoading] = useState(false);

  async function handleSignIn(data: SignInFormData): Promise<void> {
    try {
      setLoading(true);

      const { email, password } = data;

      await signIn({ email, password });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Oh no 😕',
        description: err.data.message,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Grid templateColumns={{ base: '1fr', lg: '640px 1fr' }} h="100vh">
      <Flex
        bg="gray.50"
        p="8"
        flexDir="column"
        justify="space-between"
        align="flex-start"
        display={{ base: 'none', lg: 'flex' }}
      >
        <Image src={logoBlackImage} alt="Mocha logo" width="40" height="20" />

        <Text>Copyright</Text>
      </Flex>

      <Flex justify="center" align="center">
        <Flex as="form" flexDir="column" w="320px" m="4">
          <Heading mb="8" alignSelf="center">
            Sign In
          </Heading>

          <Button colorScheme="gray" disabled>
            Sign In with GitHub
          </Button>

          <Flex align="center" my="4">
            <Divider />
            <Text mx="4" fontSize="14">
              Or
            </Text>
            <Divider />
          </Flex>

          <Stack>
            <Input label="Email" errors={errors} {...register('email')} />

            <Input
              type="password"
              label="Password"
              errors={errors}
              {...register('password')}
            />
          </Stack>

          <UnorderedList mt="4">
            {Object.keys(errors).map(error => (
              <ListItem color="red" key={error}>
                {errors[error].message}
              </ListItem>
            ))}
          </UnorderedList>

          <Button
            type="submit"
            colorScheme="pink"
            mt="8"
            onClick={handleSubmit(handleSignIn)}
            isLoading={loading}
          >
            Sign In
          </Button>

          <Text mt="16" alignSelf="center">
            Don&apos;t have account yet?{' '}
            <Link
              color="pink.500"
              disabled
              _disabled={{
                color: 'gray.400',
                cursor: 'not-allowed',
                textDecoration: 'none',
              }}
            >
              Sign Up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'mocha.token': token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
