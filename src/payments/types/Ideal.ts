import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class Ideal extends AbstractPaymentType implements PaymentType {
  private _bic: string

  /**
   * Set Bank name
   *
   * @param {string} bic
   * @returns {Ideal}
   */
  public setBic(bic: string): Ideal {
    this._bic = bic
    return this
  }

  /**
   * Get Bank name
   *
   * @returns {string}
   */
  public getBic(): string {
    return this._bic
  }

  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_IDEAL
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    return {
      bic: this.getBic()
    }
  }
}
