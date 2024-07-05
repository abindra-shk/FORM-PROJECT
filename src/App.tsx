import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { store } from './store/store.ts';
import theme from './themes/theme.ts';
import MainRoute from './routes/routes.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <MainRoute />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
