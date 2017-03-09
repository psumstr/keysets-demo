import credentials from "./credentials";
import * as ZoomdataSDK from 'ZoomdataSDK';
import application from './application';

export default ZoomdataSDK.createClient({
  credentials,
  application
});
