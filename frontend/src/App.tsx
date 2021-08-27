import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from './contexts';
import { Routes } from './routes';

Modal.setAppElement('#root');

export function App(): JSX.Element {
  return (
    <AppProvider>
      <ToastContainer />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
}
