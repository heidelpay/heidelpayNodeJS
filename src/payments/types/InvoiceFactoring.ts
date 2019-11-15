import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class InvoiceFactoring extends AbstractPaymentType implements PaymentType {
  private _invoiceId: string
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_INVOICE_FACTORING
  }

  /**
   * Set Invoice Id
   *
   * @param {string} invoiceId
   */
  public setInvoiceId(invoiceId: string): void {
    this._invoiceId = invoiceId
  }

  /**
   * Get Invoice Id
   *
   * @returns {string}
   */
  public getInvoiceId(): string {
    return this._invoiceId
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    if (typeof this.getInvoiceId() === 'undefined') {
      return {}
    }
    
    return {
      invoiceId: this._invoiceId
    }
  }
}
