import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//components
import { AuthContextProvider } from './Store/auth-context';
import App from './App';
//styles
import "./index.css";

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);