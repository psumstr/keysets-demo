import * as React from 'react';
import { Menu, Button, Intent, MenuItem } from "@blueprintjs/core";
import {MenuItems, IWidgetStore} from "./WidgetContainer";
import { inject } from "mobx-react";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class ActiveFiltersMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  onBackButtonClick = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.menu.active = MenuItems.NONE);
  };

  onAddFilterClick = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.menu.active = MenuItems.ADD_FILTER);
  };

  onItemClick = (field: any) => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.menu.active = MenuItems.ATTRIBUTE_VALUES);
    widgetStore && (widgetStore.menu.filters.selectedField = field);
  };

  createFilterItem = (filter: any) => {
    const { widgetStore } = this.props;
    const objectField = widgetStore && widgetStore.source.objectFields.find((field: any) => field.name === filter.path);
    return (
      <MenuItem
        key={objectField.name}
        shouldDismissPopover={false}
        text={objectField.label}
        onClick={() => this.onItemClick(objectField)} />
    )
  };

  render() {
    const { widgetStore } = this.props;
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
        {widgetStore && widgetStore.menu.filters.list.map(this.createFilterItem)}
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
