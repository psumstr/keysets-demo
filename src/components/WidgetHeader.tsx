import * as React from 'react';

interface IWidgetTitle {
  title: string;
}

export default class WidgetHeader extends React.Component<IWidgetTitle, {}> {
  renderWidgetTitle = () => {
    const { title } = this.props;
    return <div className="widgetTitle">{title}</div>
  };
  renderHeaderControls = () => {
    return <div className="widgetHeaderControls">
      <button type="button" className="pt-button pt-minimal pt-icon-more"></button>
    </div>
  };
  render() {
    return <div className="widgetHeader">
      {this.renderWidgetTitle()}
      {this.renderHeaderControls()}
    </div>
  }
}
