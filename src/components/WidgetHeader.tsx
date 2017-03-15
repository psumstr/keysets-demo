import * as React from 'react';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import WidgetMenu from "./WidgetMenu";

interface IWidgetTitle {
  title: string;
}

export default class WidgetHeader extends React.Component<IWidgetTitle, {}> {
  renderWidgetTitle = () => {
    const { title } = this.props;
    return <div className="widget-title">{title}</div>
  };
  renderHeaderControls = () => {
    return <div className="widget-header-controls">
      <Popover
        content={<WidgetMenu />}
        position={Position.LEFT_BOTTOM} >
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
