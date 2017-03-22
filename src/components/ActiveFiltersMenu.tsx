import * as React from 'react';
import { Menu, Button, Intent, MenuItem } from "@blueprintjs/core";
import {MenuItems, IWidgetStore} from "./WidgetContainer";
import { inject } from "mobx-react";
import { action } from "mobx";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class ActiveFiltersMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  @action('show the main widget menu')
  onBackButtonClick = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.NONE;
    }
  };

  @action('show the add filter menu')
  onAddFilterClick = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.ADD_FILTER;
    }
  };

  @action('show the attribute values menu')
  onItemClick = (field: any) => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.ATTRIBUTE_VALUES;
      widgetStore.menu.filters.selectedField = field;
    }
  };

  createFilterItem = (filter: any) => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      const objectField = widgetStore.source.objectFields.find((field: any) => field.name === filter.path);
      return (
        <MenuItem
          key={objectField.name}
          shouldDismissPopover={false}
          text={objectField.label}
          onClick={() => this.onItemClick(objectField)}/>
      )
    } else {
      return <div></div>
    }
  };

  render() {
    const { widgetStore } = this.props;
    if (widgetStore) {
      return (
        <Menu>
          <h6>
            <Button
              className="pt-minimal"
              intent={Intent.PRIMARY}
              onClick={this.onBackButtonClick}
              iconName="chevron-left">
            </Button>
            Active Filters
          </h6>
          {widgetStore.menu.filters.list.map(this.createFilterItem)}
          <Button
            className="pt-fill"
            intent={Intent.PRIMARY}
            onClick={this.onAddFilterClick}
            text="Add Filter">
          </Button>
        </Menu>
      )
    } else {
      return <div></div>
    }
  }
}
