import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class InvoiceFactoring extends AbstractPaymentType implements PaymentType {
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_INVOICE_FACTORING
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
