import { Switch } from 'react-router-dom';

import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { UnderConstruction } from '../pages/UnderConstruction';
import { Route } from './Route';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} isPrivate={false} />

      <Route path="/dashboard" exact component={Home} />

      <Route path="*" component={UnderConstruction} isPrivate={false} />
    </Switch>
  );
}
