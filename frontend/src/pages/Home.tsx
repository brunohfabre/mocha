import { useEffect } from 'react';

export function Home(): JSX.Element {
  useEffect(() => {
    document.title = 'Home | Mocha';
  }, []);

  return (
    <div>
      <h3>home page</h3>
    </div>
  );
}
