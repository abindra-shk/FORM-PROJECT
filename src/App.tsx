import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { persistor, store } from './store/store.ts';
import theme from './themes/theme.ts';
import MainRoute from './routes/routes.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <MainRoute />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
