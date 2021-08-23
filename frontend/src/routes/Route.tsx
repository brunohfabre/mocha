import { useContext } from 'react';

import {
  Redirect,
  Route as RRDRoute,
  RouteProps as RRDRouteProps,
} from 'react-router-dom';

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
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <h3>Loading...</h3>;
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
