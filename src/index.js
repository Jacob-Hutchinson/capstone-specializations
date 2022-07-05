import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Auth0Provider} from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Auth0Provider
    domain='dev-3-cuqaba.us.auth0.com'
    clientId='7vYdAYkge98XR4C5RH2LnGIPuvrRVS18'
    redirectUri={window.location.origin}
    >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Auth0Provider>
  // </React.StrictMode>
);


