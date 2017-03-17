import * as React from 'react';
import queryConfig from "../zoomdata/queryConfig";
import { getControlsCfg, getSource, getVisVariables } from "../zoomdata/utils";
import { inject } from "mobx-react";
import { IZoomdata } from '../stores/Zoomdata';
import { IWidgetStore } from "./WidgetContainer";

export interface IWidgetProps {
  template: string;
  sourceName: string;
  zoomdata?: IZoomdata;
  widgetStore?: IWidgetStore;
}
@inject(stores => ({
  zoomdata: stores.zoomdata as IZoomdata,
  widgetStore: stores.widgetStore as IWidgetStore
}))
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
    const { zoomdata, widgetStore, template, sourceName } = this.props;
    const source = zoomdata && (getSource(zoomdata.sources, sourceName));
    widgetStore && (widgetStore.source = source);
    const controlsCfg = getControlsCfg(source);
    const visVariables = getVisVariables(source, template);
    queryConfig.time = controlsCfg.timeControlCfg;
    queryConfig.player = controlsCfg.playerControlCfg;

    zoomdata && zoomdata.client.visualize({
      element: this.node,
      config: queryConfig,
      source,
      visualization: template,
      variables: visVariables
    }).then((visualization: any) => {
      zoomdata.visualizations.push(visualization);
      visualization.thread.on('thread:start', () => {
        $(visualization.element).parent().siblings('.widget-header').css('visibility', 'hidden');
        $(visualization.element).parent().css('visibility', 'hidden');
        $(visualization.element).css('visibility', 'hidden');
        $(visualization.element).parent().siblings('.widget-spinner').show();
      });
      visualization.thread.on('thread:notDirtyData', () => {
        $(visualization.element).parent().siblings('.widget-spinner').hide();
        $(visualization.element).parent().siblings('.widget-header').css('visibility', 'visible');
        $(visualization.element).parent().css('visibility', 'visible');
        $(visualization.element).css('visibility', 'visible');
      });
    }).catch((error: string) => {
      console.log(error);
    })
  }

  render() {
    return <div className="chart" ref={node => this.node = node}></div>
  }
}
