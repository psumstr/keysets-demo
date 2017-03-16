import * as React from 'react';
import {Menu, MenuItem } from '@blueprintjs/core';
import { inject } from "mobx-react";
import { IWidgetMenu, MenuItems } from "./WidgetContainer";

@inject(stores => ({
  menuStore: stores.menuStore as IWidgetMenu
}))
export default class WidgetMenu extends React.Component<{menuStore?: IWidgetMenu}, {}> {
  onFiltersClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { menuStore } = this.props;
    menuStore && (menuStore.selected = MenuItems.FILTERS);
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
