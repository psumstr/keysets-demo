import * as React from 'react';
import Navbar from './Navbar';
import WidgetGrid from './WidgetGrid';

export default class App extends React.Component<{}, {}> {
  render() {
    if (process.env.NODE_ENV === 'production') {
      return (
        <div>
          <Navbar />
          <WidgetGrid />
        </div>
      )
    } else {
      let DevTools = require('mobx-react-devtools').default;
      return (
        <div>
          <DevTools />
          <Navbar />
          <WidgetGrid />
        </div>
      )
    }
  }
};
