import './main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from "mobx-react";
import  {Zoomdata } from "./stores/Zoomdata";
import {AppContainer} from "react-hot-loader";

const root:Element | null = document.getElementById('root') || document.body;
const zoomdata = new Zoomdata();

ReactDOM.render(
  <Provider zoomdata={zoomdata}>
    <AppContainer>
        <App />
    </AppContainer>
  </Provider>,
  root
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <Provider zoomdata={zoomdata}>
        <AppContainer>
            <NextApp />
        </AppContainer>
      </Provider>,
      root
    )
  });
}
