import * as React from 'react';
import {Menu, Button, Intent, MenuItem} from "@blueprintjs/core";
import { MenuItems, IWidgetStore } from "./WidgetContainer";
import { inject, observer } from "mobx-react";

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
export default class AddFilterMenu extends React.Component<{widgetStore?: IWidgetStore}, {}> {
  onBackButtonClick = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.selected = MenuItems.FILTERS);
  };

  getAttributeMenuItem  = (field: any) => {
    return (
      <MenuItem
        iconName="plus"
        text={field.label} />
    )
  };

  render() {
    const { widgetStore } = this.props;
    const attributeFileds = widgetStore &&
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
        {attributeFileds.map(this.getAttributeMenuItem)}
      </Menu>
    )
  }
}
