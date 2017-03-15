import * as React from 'react';
import Widget from './Widget';
import { IWidgetProps } from "./Widget";

export default class WidgetBody extends React.Component<IWidgetProps, {}> {
  render() {
    const  { template, sourceName } = this.props;
    return <div className="widget-body">
      <Widget
        template={template}
        sourceName={sourceName} />
    </div>
  }
}
