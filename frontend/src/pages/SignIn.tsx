import { useEffect, useRef, useState, useContext } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import LogoBlackImage from '../assets/images/logo_black.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/AuthContext';
import getValidationErrors from '../helpers/getValidationErrors';

interface SignInData {
  email: string;
  password: string;
}

export function SignIn(): JSX.Element {
  const { signIn } = useContext(AuthContext);

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Sign in | Mocha';
  }, []);

  async function handleSubmit(data: SignInData): Promise<void> {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      signIn({ email, password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <header className="max-w-screen-xl w-full p-4 md:p-8 self-center ">
        <img src={LogoBlackImage} alt="Mocha" className="w-10" />
      </header>

      <div className="self-center max-w-xs w-full flex flex-col">
        <h1 className="text-5xl font-semibold self-center mb-8 text-gray-900">
          Sign in
        </h1>

        <Button
          type="button"
          color="github"
          onClick={() => history.push('/github')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current w-6 h-6"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
          </svg>
          Continue with GitHub
        </Button>

        <div className="flex items-center my-4">
          <hr className="w-full" />
          <p className="mx-4 text-gray-500">or</p>
          <hr className="w-full" />
        </div>

        <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <Input name="email" label="Email" />
          <Input
            name="password"
            type="password"
            label="Password"
            className="mt-2"
          />

          <Button
            type="submit"
            color="primary"
            className="mt-4"
            isLoading={loading}
          >
            Sign in
          </Button>
        </Form>

        <Link
          to="/forgot"
          className="self-center underline text-sm text-gray-800 hover:text-purple-500 mt-8 transition-all"
        >
          Forgot password?
        </Link>
        <p className="self-center text-sm mt-4">
          Don&apos;t have account?{' '}
          <Link
            to="/signup"
            className="underline  text-gray-800 hover:text-purple-500 transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>

      <footer className="self-center p-4 md:p-8 max-w-screen-sm text-center text-xs text-gray-300">
        By clicking “Continue with GitHub/Email” above, you acknowledge that you
        have read and understood, and agree to Mocha&apos;s{' '}
        <Link
          to="/terms"
          className="underline hover:text-purple-500 transition-all"
        >
          Terms & Conditions
        </Link>{' '}
        and{' '}
        <Link
          to="/privacypolicy"
          className="underline hover:text-purple-500 transition-all"
        >
          Privacy Policy
        </Link>
        .
      </footer>
    </div>
  );
}
