import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class Ideal extends AbstractPaymentType implements PaymentType {
  private _bankName: string

  /**
   * Set Bank name
   *
   * @param {string} bankName
   * @returns {Ideal}
   */
  public setBankName(bankName: string): Ideal {
    this._bankName = bankName
    return this
  }

  /**
   * Get Bank name
   *
   * @returns {string}
   */
  public getBankName(): string {
    return this._bankName
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
    return {}
  }
}
