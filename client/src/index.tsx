import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import Constants from "./auth/Constants";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <Auth0Provider
  domain={Constants.domain}
clientId={Constants.clientId}
redirectUri={Constants.redirectUri}
audience={Constants.authaudience}
scope="read:current_user update:current_user_metadata"
>
  <App />
  </Auth0Provider>,
  document.getElementById("root")
);
registerServiceWorker.unregister();