import Heidelpay from '../..'
import { Customer } from '../Customer'

export default class Resources {
  private typeId: string
  private customerId: string
  private metadataId: string
  private paymentId: string
  private basketId: string

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
   * Get Basket Id
   *
   * @returns {string}
   */
  public getBasketId(): string {
    return this.basketId
  }

  /**
   * Set Basket Id
   *
   * @param {string} paymentId
   * @returns {Resources}
   */
  public setBasketId(basketId: string): Resources {
    this.basketId = basketId
    return this
  }
}
