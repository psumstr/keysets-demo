import * as React from 'react';
import WidgetContainer from './WidgetContainer';
import * as ZoomdataSDK from 'ZoomdataSDK';
import { credentials, application } from '../zoomdata';

interface IWidgetGridState {
  zd: any;
  vizInstances: Array<any>
}

export default class WidgetGrid extends React.Component<any, IWidgetGridState> {
  constructor() {
    super();
    this.state = {
      zd: {},
      vizInstances: []
    };
    let timeoutId: number;

    window.onresize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(this.onWindowResize, 100);
    };

    async function getZoomdata(instance: WidgetGrid) {
      try {
        const sourceNames = ['Patients', 'Visit Drugs'];
        const client = await ZoomdataSDK.createClient({credentials, application});
        await client.sources.update({name: sourceNames[0]});
        await client.sources.update({name: sourceNames[1]});
        const sources = await client.sources.fetch();
        instance.setState({
          zd: {
            client: client,
            sources: sources
          }
        });
      }
      catch(err) {
        console.log(err.message);
      }
    }
    getZoomdata(this);
  }

  onVizRender = (vizInstance: any) => {
    const vizInstances = [...this.state.vizInstances, vizInstance];
    this.setState({
      vizInstances
    })
  };

  onWindowResize = () => {
    this.state.vizInstances.forEach((visualization) => {
      visualization.resize($(visualization.element.parentNode).width(), $(visualization.element.parentNode).height());
    })
  };

  render() {
    if (this.state.zd.client) {
      return (
        <div className="container">
          <WidgetContainer className={"box1"}
                           template="Pie"
                           sourceName="Patients"
                           zd={this.state.zd}
                           onVizRender={this.onVizRender} />
          <WidgetContainer className={"box2"}
                           template="Packed Bubbles"
                           sourceName="Visit Drugs"
                           zd={this.state.zd}
                           onVizRender={this.onVizRender} />
        </div>
      );
    } else {
      return <div></div>
    }

  }
}
