declare module 'ZoomdataSDK' {
  interface IApplication {
    secure: boolean;
    host: string;
    port: number;
    path: string;
  }
  interface ISecurityKey {
    key: string;
  }

  interface  IAccessToken {
    access_token: string;
  }

  interface IClientConfig {
    credentials: ISecurityKey | IAccessToken,
    application: IApplication
  }

  interface IQueryConfig {
    filters: Array<object>;
    groups: Array<object>;
    metrics: Array<object>;
    time?: object | null;
    player?: object
  }

  interface IFilter {
    path: string;
    operation: string;
    values: Array<string | number>
  }
  function createClient(config: IClientConfig): Promise<any>
}
