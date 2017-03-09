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

  function createClient(config: IClientConfig): Promise<any>
}
