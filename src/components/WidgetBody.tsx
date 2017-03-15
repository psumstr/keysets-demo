import * as React from 'react';
import Widget from './Widget';
import { IWidgetProps } from "./Widget";

export default class WidgetBody extends React.Component<IWidgetProps, {}> {
  render() {
    const  { template, sourceName, zd, onVizRender } = this.props;
    return <div className="widget-body">
      <Widget zd={zd}
                  template={template}
                  sourceName={sourceName}
                  onVizRender={onVizRender} />
    </div>
  }
}
