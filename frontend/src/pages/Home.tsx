import { useContext, useEffect } from 'react';

import { Button } from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';

export function Home(): JSX.Element {
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Home | Mocha';
  }, []);

  return (
    <div>
      <h3>home page</h3>
      <Button type="button" onClick={signOut} color="red">
        Sign out
      </Button>
    </div>
  );
}
