import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
// import App from './App';
import './index.css';
import client from './garphql/apolloClient'; // Importing the client configuration
import Test from './garphql/test';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <App /> */}
      <Test />
    </ApolloProvider>
  </React.StrictMode>
);
