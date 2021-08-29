import { useContext } from 'react';

import {
  Redirect,
  Route as RRDRoute,
  RouteProps as RRDRouteProps,
} from 'react-router-dom';

import LogoBlackImage from '../assets/images/logo_black.svg';
import { AuthContext } from '../contexts/AuthContext';
import { AuthLayout } from '../pages/layouts/AuthLayout';
import { DefaultLayout } from '../pages/layouts/DefaultLayout';

interface RouteProps extends RRDRouteProps {
  component: any;
  isPrivate?: boolean;
}

export function Route({
  component: Component,
  isPrivate = true,
  ...rest
}: RouteProps): JSX.Element {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <img src={LogoBlackImage} alt="Mocha" className="w-16 animate-bounce" />
      </div>
    );
  }

  if (!isAuthenticated && isPrivate) {
    return <Redirect to="/signin" />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Redirect to="/notes" />;
  }

  const Layout = isAuthenticated ? DefaultLayout : AuthLayout;

  return (
    <Layout>
      <RRDRoute {...rest} render={props => <Component {...props} />} />
    </Layout>
  );
}
