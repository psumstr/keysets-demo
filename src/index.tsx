import './main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "mobx-react";
import  { Zoomdata } from "./stores";
import { AppContainer } from "react-hot-loader";

const root = document.getElementById('root');
const zoomdata = new Zoomdata();

ReactDOM.render(
    <AppContainer>
      <Provider
        zoomdata={zoomdata}>
        <App />
      </Provider>
    </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider zoomdata={zoomdata}>
          <NextApp />
        </Provider>
      </AppContainer>,
      root
    )
  });
}
