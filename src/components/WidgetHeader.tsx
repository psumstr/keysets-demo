import * as React from 'react';

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
      <button type="button" className="pt-button pt-minimal pt-icon-more"></button>
    </div>
  };
  render() {
    return <div className="widget-header">
      {this.renderWidgetTitle()}
      {this.renderHeaderControls()}
    </div>
  }
}
