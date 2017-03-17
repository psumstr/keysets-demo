import * as React from 'react';
import { Popover, Position, Button } from '@blueprintjs/core';
import WidgetMenu from "./WidgetMenu";
import { inject, observer } from "mobx-react";
import ActiveFiltersMenu from "./ActiveFiltersMenu";
import { IWidgetStore, MenuItems } from "./WidgetContainer";
import AddFilterMenu from "./AddFilterMenu";

interface IWidgetTitle {
  title: string;
  widgetStore?: IWidgetStore
}

@inject(stores => ({
  widgetStore: stores.widgetStore as IWidgetStore
}))
@observer
export default class WidgetHeader extends React.Component<IWidgetTitle, {}> {
  renderWidgetTitle = () => {
    const { title } = this.props;
    return <div className="widget-title">{title}</div>
  };
  getPopoverContent = () => {
    const { widgetStore } = this.props;
    let content;
    switch (widgetStore && widgetStore.selected) {
      case MenuItems.FILTERS:
        content = <ActiveFiltersMenu />;
        break;
      case MenuItems.ADDFILTER:
        content = <AddFilterMenu />;
        break;
      case MenuItems.NONE:
      default:
        content = <WidgetMenu />;
        break;
    }
    return content;
  };

  onPopoverClose = () => {
    const { widgetStore } = this.props;
    widgetStore && (widgetStore.selected = MenuItems.NONE);
  };

  renderHeaderControls = () => {
    return <div className="widget-header-controls">
      <Popover
        className="menu-popover"
        lazy={true}
        content={this.getPopoverContent()}
        onClose={this.onPopoverClose}
        position={Position.LEFT_TOP} >
        <Button
          className="pt-minimal"
          iconName="more" />
      </Popover>
    </div>
  };
  render() {
    return <div className="widget-header">
      {this.renderWidgetTitle()}
      {this.renderHeaderControls()}
    </div>
  }
}
