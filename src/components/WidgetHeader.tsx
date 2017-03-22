import * as React from 'react';
import { Popover, Position, Button } from '@blueprintjs/core';
import WidgetMenu from './WidgetMenu';
import { inject, observer } from 'mobx-react';
import ActiveFiltersMenu from './ActiveFiltersMenu';
import { IWidgetStore, MenuItems } from './WidgetContainer';
import AddFilterMenu from './AddFilterMenu';
import AttributeValuesMenu from './AttributeValuesMenu';
import { action } from "mobx";

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
    if (widgetStore) {
      switch (widgetStore.menu.active) {
        case MenuItems.FILTERS:
          return <ActiveFiltersMenu />;
        case MenuItems.ADD_FILTER:
          return <AddFilterMenu />;
        case MenuItems.ATTRIBUTE_VALUES:
          return <AttributeValuesMenu />;
        case MenuItems.NONE:
        default:
          return <WidgetMenu />;
      }
    } else {
      return <div></div>
    }
  };

  @action('show main widget menu') onPopoverWillClose = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.NONE;
    }
  };

  renderHeaderControls = () => {
    return <div className="widget-header-controls">
      <Popover
        content={this.getPopoverContent()}
        popoverWillClose={this.onPopoverWillClose}
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
