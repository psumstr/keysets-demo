import * as React from 'react';
import {Menu, MenuItem, Intent} from '@blueprintjs/core';

export default class WidgetMenu extends React.Component<{}, {}> {
  render() {
    return (
      <Menu>
        <MenuItem
          iconName="filter"
          text="Filter" />
        <MenuItem
          iconName="flows"
          text="Keysets" />
      </Menu>
    )
  }
}
