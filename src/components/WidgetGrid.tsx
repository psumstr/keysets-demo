import * as React from 'react';
import WidgetContainer from './WidgetContainer';
import {inject, observer} from "mobx-react";
import { IZoomdata } from "../stores/Zoomdata";

@inject(stores => ({
  zoomdata: stores.zoomdata as IZoomdata
}))
@observer
export default class WidgetGrid extends React.Component<{zoomdata?: IZoomdata}, {}> {
  constructor() {
    super();
    let timeoutId: number;

    window.onresize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(this.onWindowResize, 100);
    };
  }

  onWindowResize = () => {
    const { zoomdata } = this.props;
    if (zoomdata) {
      zoomdata.visualizations.forEach((visualization) => {
        visualization.resize($(visualization.element.parentNode).width(), $(visualization.element.parentNode).height());
      })
    }
  };

  render() {
    const { zoomdata } = this.props;
    if (zoomdata && zoomdata.sources.length > 0) {
      return (
        <div className="container">
          <WidgetContainer className={"box1"}
                           template="Pie"
                           sourceName="Patients" />
          <WidgetContainer className={"box2"}
                           template="Packed Bubbles"
                           sourceName="Visit Drugs" />
        </div>
      );
    } else {
      return <div></div>
    }

  }
}
