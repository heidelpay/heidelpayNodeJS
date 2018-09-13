import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class SepaDirectDebitGuaranteed extends AbstractPaymentType implements PaymentType {
  private _iban: string

  /**
   * Set iban number
   *
   * @param {string} iban
   * @returns {SepaDirectDebit}
   */
  public setIban(iban: string): SepaDirectDebitGuaranteed {
    this._iban = iban
    return this
  }

  /**
   * Get iban number
   *
   * @returns {string}
   */
  public getIban(): string {
    return this._iban
  }

  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_SEPA_DIRECT_DEBIT_GUARANTEED
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
