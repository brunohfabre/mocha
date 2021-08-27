import Modal from 'react-modal';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from './contexts';
import { Routes } from './routes';

Modal.setAppElement('#root');

const client = new QueryClient();

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <AppProvider>
        <ToastContainer />

        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}
