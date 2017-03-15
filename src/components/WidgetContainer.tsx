import * as React from 'react';
import WidgetHeader from './WidgetHeader';
import WidgetBody from './WidgetBody';
import { IWidgetProps } from "./Widget";
import WidgetSpinner from "./WidgetSpinner";

interface IWidgetContainerProps extends IWidgetProps{
  className: string;
}

export default class WidgetContainer extends React.Component<IWidgetContainerProps, {}> {
  render() {
    const  { className, template, sourceName } = this.props;

    return <div className={`box ${className}`}>
      <WidgetSpinner />
      <WidgetHeader
        title={sourceName} />
      <WidgetBody
        template={template}
        sourceName={sourceName} />
    </div>;
  }
}
