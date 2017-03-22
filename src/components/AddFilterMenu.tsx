import * as React from 'react';
import { Menu, Button, Intent, MenuItem } from "@blueprintjs/core";
import { MenuItems, IWidgetStore } from "./WidgetContainer";
import { inject } from "mobx-react";
import { action } from "mobx";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class AddFilterMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  @action('show the active filters menu') onBackButtonClick = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.FILTERS;
    }
  };

  @action('show the attribute values menu') onItemClick = (field: any) => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.ATTRIBUTE_VALUES;
      widgetStore.menu.filters.selectedField = field;
    }
  };

  getAttributeMenuItem = (field: any) => {
    return (
      <MenuItem
        key={field.name}
        iconName="plus"
        shouldDismissPopover={false}
        onClick={() => this.onItemClick(field)}
        text={field.label} />
    )
  };

  render() {
    const { widgetStore } = this.props;
    if (widgetStore) {
      const attributeFields = widgetStore.source.objectFields.filter((field: any) => field.type === 'ATTRIBUTE');
      return (
        <Menu>
          <h6>
            <Button
              className="pt-minimal"
              intent={Intent.PRIMARY}
              onClick={this.onBackButtonClick}
              iconName="chevron-left" >
            </Button>
            Add Filter
          </h6>
          <li className="pt-menu-header"><div>Attributes</div></li>
          {attributeFields.map(this.getAttributeMenuItem)}
        </Menu>
      )
    } else {
      return <div></div>
    }
  }
}
