import { Switch } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { SignIn } from '../pages/SignIn';
import { UnderConstruction } from '../pages/UnderConstruction';
import { Route } from './Route';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} isPrivate={false} />

      <Route path="/dashboard" exact component={Dashboard} />

      <Route path="*" component={UnderConstruction} isPrivate={false} />
    </Switch>
  );
}
