import * as React from 'react';
import { Menu, Button, Intent, MenuItem } from "@blueprintjs/core";
import { MenuItems, IWidgetStore } from "./WidgetContainer";
import { inject } from "mobx-react";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class AddFilterMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  onBackButtonClick = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.menu.active = MenuItems.FILTERS);
  };

  onItemClick = (field: any) => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.menu.active = MenuItems.ATTRIBUTE_VALUES);
    widgetStore && (widgetStore.menu.filters.selectedField = field);
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
    const attributeFields = widgetStore &&
      widgetStore.source.objectFields.filter((field: any) => field.type === 'ATTRIBUTE');
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
  }
}
