import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
