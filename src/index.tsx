import './main.css';
import "@blueprintjs/core/dist/blueprint.css";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "mobx-react";
import  { Zoomdata } from "./stores";

const root = document.getElementById('root');
const zoomdata = new Zoomdata();

ReactDOM.render(
  <Provider
    zoomdata={zoomdata}>
    <App />
  </Provider>,
  root
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const AppContainer = require('react-hot-loader').AppContainer;
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
