import "@blueprintjs/core/dist/blueprint.css";
import './main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "mobx-react";
let Zoomdata;
import { useStrict } from "mobx";
import { Dialog } from "@blueprintjs/core";
import { application } from './zoomdata';

useStrict(true); // set mobx to strict mode

const root = document.getElementById('root');
try {
  Zoomdata = require('./stores').Zoomdata;
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
} catch (err) {
  ReactDOM.render(
    <Dialog
      iconName="error"
      isOpen={true}
      title="Unable to import the Zoomdata SDK Client"
    >
      <div className="pt-dialog-body">
        <p>{`Please check if you the following Zoomdata server is running:`}</p>
        <a
          href={application.secure ? 'https://' + application.host : 'http://' + application.host}
          target="_blank"
        >{`${application.host}`}
        </a>
      </div>
    </Dialog>,
    root
  )
}
