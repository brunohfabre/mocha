import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from './contexts';
import { Routes } from './routes';

export function App(): JSX.Element {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
}
