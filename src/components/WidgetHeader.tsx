import * as React from 'react';
import { Popover, Position } from '@blueprintjs/core';
import WidgetMenu from "./WidgetMenu";
import { inject, observer } from "mobx-react";
import ActiveFiltersMenu from "./ActiveFiltersMenu";
import { IWidgetMenu, MenuItems } from "./WidgetContainer";

interface IWidgetTitle {
  title: string;
  menuStore?: IWidgetMenu
}

@inject(stores => ({
  menuStore: stores.menuStore as IWidgetMenu
}))
@observer
export default class WidgetHeader extends React.Component<IWidgetTitle, {}> {
  renderWidgetTitle = () => {
    const { title } = this.props;
    return <div className="widget-title">{title}</div>
  };
  getPopoverContent = () => {
    const { menuStore } = this.props;
    let content;
    switch (menuStore && menuStore.selected) {
      case MenuItems.FILTERS:
        content = <ActiveFiltersMenu />;
        break;
      case MenuItems.NONE:
      default:
        content = <WidgetMenu />;
        break;
    }
    return content;
  };

  onPopoverClose = () => {
    const { menuStore } = this.props;
    menuStore && (menuStore.selected = MenuItems.NONE);
  };

  renderHeaderControls = () => {
    return <div className="widget-header-controls">
      <Popover
        className="menu-popover"
        lazy={true}
        content={this.getPopoverContent()}
        onClose={this.onPopoverClose}
        position={Position.LEFT_TOP} >
        <button type="button" className="pt-button pt-minimal pt-icon-more"></button>
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
