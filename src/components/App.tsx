import * as React from 'react';
import Navbar from './Navbar';
import WidgetGrid from './WidgetGrid';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Navbar />
        <WidgetGrid />
      </div>
    )
  }
};
