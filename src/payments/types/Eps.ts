import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class Eps extends AbstractPaymentType implements PaymentType {
  private _bic: string

  /**
   * Set BIC
   *
   * @param {string} bic
   * @returns {Eps}
   */
  public setBic(bic: string): Eps {
    this._bic = bic
    return this
  }

  /**
   * Get BIC
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
    return apiURL.URL_TYPE_EPS
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    if(typeof this.getBic() === 'undefined') {
        return {}
    }

    return {
      bic: this.getBic()
    }
  }
}
