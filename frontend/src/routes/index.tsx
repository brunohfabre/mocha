import { Switch } from 'react-router-dom';

import { Note } from '../pages/Note';
import { Notes } from '../pages/Notes';
import { SignIn } from '../pages/SignIn';
import { UnderConstruction } from '../pages/UnderConstruction';
import { Route } from './Route';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} isPrivate={false} />

      <Route path="/notes" exact component={Notes} />
      <Route path="/notes/:id" exact component={Note} />

      <Route path="*" component={UnderConstruction} isPrivate={false} />
    </Switch>
  );
}
