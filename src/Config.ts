export interface IConfig {
  privateKey: string
  apiProtocol?: string
  apiHost?: string
  apiVersion?: string
}

export class Config {
  private privateKey: string
  private apiProtocol: string
  private apiHost: string
  private apiVersion: string

  /**
   * @param  {IConfig} config
   */
  constructor(config: IConfig) {
    this.privateKey = config.privateKey
    this.apiProtocol = config.apiProtocol || 'https'
    this.apiHost = config.apiHost || 'dev-api.heidelpay.com'
    this.apiVersion = config.apiVersion || 'v1'
  }

  /**
   * @returns string
   */
  public getApiProtocol(): string {
    return this.apiProtocol
  }

  /**
   * @param  {string} apiProtocol
   * @returns void
   */
  public setApiProtocol(apiProtocol: string): void {
    this.apiProtocol = apiProtocol
  }

  /**
   * @returns string
   */
  public getApiHost(): string {
    return this.apiHost
  }

  /**
   * @param  {string} apiHost
   * @returns void
   */
  public setApiHost(apiHost: string): void {
    this.apiHost = apiHost
  }

  /**
   * @returns string
   */
  public getApiVersion(): string {
    return this.apiVersion
  }

  /**
   * @param  {string} apiVersion
   * @returns void
   */
  public setApiVersion(apiVersion: string): void {
    this.apiVersion = apiVersion
  }

  /**
   * @returns string
   */
  public getPrivateKey(): string {
    return this.privateKey
  }

  /**
   * @param  {string} privateKey
   * @returns void
   */
  public setPrivateKey(privateKey: string): void {
    this.privateKey = privateKey
  }
}
