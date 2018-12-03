import * as apiURL from '../../configs/ApiUrls'
import PaymentType from './PaymentType'
import AbstractPaymentType from './AbstractPaymentType'

export default class Paypal extends AbstractPaymentType implements PaymentType {
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_PAYPAL
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