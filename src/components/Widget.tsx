import * as React from 'react';
import queryConfig from "../zoomdata/queryConfig";
import { getControlsCfg, getSource, getVisVariables } from "../zoomdata/utils";
import { inject } from "mobx-react";
import { IZoomdata } from '../stores/Zoomdata';
import { IWidgetStore } from "./WidgetContainer";
import {runInAction} from "mobx";

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
  static componentWillReceiveProps(nextProps: any) {
    if (!nextProps) {
      return;
    }
  }
  static shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const { zoomdata, widgetStore, template, sourceName } = this.props;
    if (zoomdata && widgetStore) {
      const source = getSource(zoomdata.sources, sourceName);
      widgetStore.source = source;
      const controlsCfg = getControlsCfg(source);
      const visVariables = getVisVariables(source, template);
      queryConfig.time = controlsCfg.timeControlCfg;
      queryConfig.player = controlsCfg.playerControlCfg;

      zoomdata.client.visualize({
        element: this.node,
        config: queryConfig,
        source,
        visualization: template,
        variables: visVariables
      }).then((visualization: any) => {
        runInAction('store reference to zoomdata visualization', () => {
          widgetStore.visualization = visualization;
          zoomdata.visualizations.push(visualization);
          visualization.thread.on('thread:start', () => this.onQueryStart(visualization));
          visualization.thread.on('thread:notDirtyData', () => this.onQueryComplete(visualization));
          visualization.thread.on('thread:noData', () => this.onQueryComplete(visualization));
        });
      }).catch((error: string) => {
        console.log(error);
      })
    }
  }

  onQueryStart = ((visualization: any) => {
    $(visualization.element).parent().siblings('.widget-header').css('visibility', 'hidden');
    $(visualization.element).parent().css('visibility', 'hidden');
    $(visualization.element).css('visibility', 'hidden');
    $(visualization.element).parent().siblings('.widget-spinner').show();
  });

  onQueryComplete = ((visualization: any) => {
    $(visualization.element).parent().siblings('.widget-spinner').hide();
    $(visualization.element).parent().siblings('.widget-header').css('visibility', 'visible');
    $(visualization.element).parent().css('visibility', 'visible');
    $(visualization.element).css('visibility', 'visible');
  });

  render() {
    return <div className="chart" ref={node => this.node = node}></div>
  }
}
