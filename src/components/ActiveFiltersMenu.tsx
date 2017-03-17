import * as React from 'react';
import { Menu, Button, Intent } from "@blueprintjs/core";
import {MenuItems, IWidgetStore} from "./WidgetContainer";
import { inject } from "mobx-react";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class ActiveFiltersMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  onBackButtonClick = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.selected = MenuItems.NONE);
  };

  onAddFilterClick = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.selected = MenuItems.ADDFILTER);
  };

  render() {
    return (
      <Menu>
        <h6>
          <Button
            className="pt-minimal"
            intent={Intent.PRIMARY}
            onClick={this.onBackButtonClick}
            iconName="chevron-left" >
          </Button>
          Active Filters
        </h6>
        <Button
          className="pt-fill"
          intent={Intent.PRIMARY}
          onClick={this.onAddFilterClick}
          text="Add Filter">
        </Button>
      </Menu>
    )
  }
}
