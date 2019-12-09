import Resources from './Resources'
import Processing from './Processing'

export default class Recurring {
  private _redirectUrl: string
  private _returnUrl: string
  private _date: string
  private _resources: Resources
  private _processing: Processing

  constructor() {
    this._resources = new Resources()
    this._processing = new Processing()
  }

  /**
   * Get redirectUrl
   *
   * @returns {string}
   */
  public getRedirectUrl(): string {
    return this._redirectUrl
  }

  /**
   * Set redirectUrl
   *
   * @param {string} redirectUrl
   * @returns {Recurring}
   */
  public setRedirectUrl(redirectUrl: string): Recurring {
    this._redirectUrl = redirectUrl
    return this
  }

  /**
   * Get returnUrl
   *
   * @returns {string}
   */
  public getReturnUrl(): string {
    return this._returnUrl
  }

  /**
   * Set returnUrl
   *
   * @param {string} returnUrl
   * @returns {Recurring}
   */
  public setReturnUrl(returnUrl: string): Recurring {
    this._returnUrl = returnUrl
    return this
  }

  /**
   * Get date
   *
   * @returns {string}
   */
  public getDate(): string {
    return this._date
  }

  /**
   * Set date
   *
   * @param {string} date
   * @returns {Recurring}
   */
  public setDate(date: string): Recurring {
    this._date = date
    return this
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this._resources
  }

  /**
   * Set resources
   *
   * @param {*} resources
   */
  public setResources(resources: any) {
    this._resources
      .setCustomerId(resources.customerId)
      .setMetadataId(resources.metadataId)
  }

  /**
   * Get Processing
   *
   * @returns {Processing}
   */
  public getProcessing(): Processing {
    return this._processing
  }

  /**
   * Set Processing
   *
   * @param {*} processing
   */
  public setProcessing(processing: any) {
    this._processing
      .setUniqueId(processing.uniqueId)
      .setShortId(processing.shortId)
  }
}

export type recurringObject = {
  returnUrl: string
  customerId?: string
  metadataId?: string
}
