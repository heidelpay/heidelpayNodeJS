import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class Bancontact extends AbstractPaymentType implements PaymentType {
  private _holder: string
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_BANCONTACT
  }

  /**
 * Set holder
 *
 * @param {string} cardHolder
 * @returns {Card}
 */
  public setHolder(holder: string): Bancontact {
    this._holder = holder
    return this
  }

  /**
   * Get holder
   *
   * @returns {string}
   */
  public getHolder(): string {
    return this._holder
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    if (typeof this.getHolder() === 'undefined') {
      return {}
    }

    return {
      holder: this._holder
    }
  }
}
