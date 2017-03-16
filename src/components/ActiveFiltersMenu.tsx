import * as React from 'react';
import { Menu, Button, Intent } from "@blueprintjs/core";
import {MenuItems, IWidgetMenu} from "./WidgetContainer";
import { inject } from "mobx-react";

@inject(stores => ({
  menuStore: stores.menuStore as IWidgetMenu
}))
export default class ActiveFiltersMenu extends React.Component<{menuStore?: IWidgetMenu}, {}> {
  onBackButtonClick = () => {
    const { menuStore } = this.props;
    menuStore && (menuStore.selected = MenuItems.NONE);
  };

  render() {
    return (
      <Menu>
        <div>
          <Button
            className="pt-minimal"
            intent={Intent.PRIMARY}
            onClick={this.onBackButtonClick}
            iconName="chevron-left" >
          </Button>
          Active Filters
        </div>
        <Button
          className="pt-fill"
          intent={Intent.PRIMARY}
          text="Add Filter">
        </Button>
      </Menu>
    )
  }
}
