import * as apiURL from '../../configs/apiURLs'
import PaymentType from './PaymentType'
import AbstractPaymentType from './AbstractPaymentType'

export default class SepaDirectDebit extends AbstractPaymentType implements PaymentType {
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_CARD
  }

  /**
   * Get url fetch end point
   *
   * @returns {string}
   */
  public getFetchTypeUrl(): string {
    return apiURL.URL_TYPE_CARD_FETCH
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
