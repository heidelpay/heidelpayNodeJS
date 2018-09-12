import Heidelpay from '..'
import { Customer } from './Customer'

export default class Resources {
  private typeId: string
  private customerId: string
  private metadataId: string
  private paymentId: string
  private riskId: string
  private _heidelpay: Heidelpay

  constructor(heidelpay: Heidelpay) {
    this._heidelpay = heidelpay
  }

  /**
   * Get Heidelpay
   *
   * @returns
   */
  public getHeidelpay(): Heidelpay {
    return this._heidelpay
  }

  /**
   * Get type Id
   *
   * @returns
   */
  public getTypeId() {
    return this.typeId
  }

  /**
   * Set type Id
   *
   * @param {string} typeId
   * @returns
   */
  public setTypeId(typeId: string) {
    this.typeId = typeId
    return this
  }

  /**
   * Get customer Id
   *
   * @returns {string}
   */
  public getCustomerId(): string {
    return this.customerId
  }

  /**
   * Set customer Id
   *
   * @param {string} customerId
   * @returns {Resources}
   */
  public setCustomerId(customerId: string): Resources {
    this.customerId = customerId
    return this
  }

  /**
   * Get meta data Id
   *
   * @returns {string}
   */
  public getMetadataId(): string {
    return this.metadataId
  }

  /**
   * Set meta data Id
   *
   * @param {string} metadataId
   * @returns {Resources}
   */
  public setMetadataId(metadataId: string): Resources {
    this.metadataId = metadataId
    return this
  }

  /**
   * Get payment Id
   *
   * @returns {string}
   */
  public getPaymentId(): string {
    return this.paymentId
  }

  /**
   * Set Payment Id
   *
   * @param {string} paymentId
   * @returns {Resources}
   */
  public setPaymentId(paymentId: string): Resources {
    this.paymentId = paymentId
    return this
  }

  /**
   * Get risk Id
   *
   * @returns {string}
   */
  public getRiskId(): string {
    return this.riskId
  }

  /**
   * Set risk Id
   *
   * @param {string} riskId
   * @returns {Resources}
   */
  public setRiskId(riskId: string): Resources {
    this.riskId = riskId
    return this
  }

  /**
   * Fetch a customer via heidelpay
   *
   * @returns {Customer}
   */
  fetchCustomer(): Promise<Customer> {
    return this.getHeidelpay().fetchCustomer(this.getCustomerId())
  }
}
