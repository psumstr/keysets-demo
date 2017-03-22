import * as ZoomdataSDK from 'ZoomdataSDK';
import { credentials, application } from '../zoomdata';
import { observable, runInAction } from "mobx";

export interface IZoomdata {
  client: any;
  sources: Array<any>;
  visualizations: Array<any>;
}

export default class Zoomdata implements IZoomdata {
  @observable client = {};
  @observable.shallow sources = [];
  @observable.shallow visualizations = [];

  constructor() {
    const instance = this;
    async function getZoomdata() {
      try {
        const sourceNames = ['Patients', 'Visit Drugs'];
        const client = await ZoomdataSDK.createClient({credentials, application});
        await client.sources.update({name: sourceNames[0]});
        await client.sources.update({name: sourceNames[1]});
        const sources = await client.sources.fetch();
        runInAction('update state with Zoomdata client and sources', () => {
          instance.client = client;
          instance.sources = sources;
        });
      }
      catch(err) {
        console.log(err.message);
      }
    }
    getZoomdata();
  }
}
