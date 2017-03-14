import * as React from 'react';
import queryConfig from "../zoomdata/queryConfig";
import {getControlsCfg, getSource, getVisVariables} from "../zoomdata/utils";

export interface IWidgetProps {
  zd: any;
  template: string;
  sourceName: string;
  onVizRender?: Function
}
export default class Widget extends React.Component<IWidgetProps, {}> {
  node: HTMLDivElement;
  componentWillReceiveProps(nextProps: any) {
    if (!nextProps) {
      return;
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const { zd, template, sourceName, onVizRender } = this.props;
    const source = getSource(zd.sources, sourceName);
    const controlsCfg = getControlsCfg(source);
    const visVariables = getVisVariables(source, template);
    queryConfig.time = controlsCfg.timeControlCfg;
    queryConfig.player = controlsCfg.playerControlCfg;

    zd.client.visualize({
      element: this.node,
      config: queryConfig,
      source,
      visualization: template,
      variables: visVariables
    }).then((visualization: any) => {
      if (onVizRender) {
        onVizRender(visualization);
      }
    }).catch((error: string) => {
      console.log(error);
    })
  }

  render() {
    return <div className="chart" ref={node => this.node = node}></div>
  }
}
