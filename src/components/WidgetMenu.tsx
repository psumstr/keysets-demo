import * as React from 'react';
import {Menu, MenuItem } from '@blueprintjs/core';
import { inject } from "mobx-react";
import { IWidgetStore, MenuItems } from "./WidgetContainer";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class WidgetMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  onFiltersClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.menu.active = MenuItems.FILTERS);
  };
  render() {
    return (
      <Menu className="widget-menu">
        <MenuItem
          iconName="filter"
          text="Filters"
          shouldDismissPopover={false}
          onClick={this.onFiltersClick} />
        <MenuItem
          iconName="flows"
          text="Keysets" />
      </Menu>
    )
  }
}
