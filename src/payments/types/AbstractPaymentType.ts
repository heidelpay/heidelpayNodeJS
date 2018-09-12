import Heidelpay from '../../Heidelpay'
import Authorization, { authorizeObject } from '../business/Authorization'
import Charge, { chargeObject } from '../business/Charge'

export default abstract class AbstractPaymentType {
  private _id: string
  private _heidelpay: Heidelpay

  /**
   * Get type URL
   *
   * @abstract
   * @returns {string}
   */
  public abstract getTypeUrl(): string
  public abstract getFetchTypeUrl(): string
  public abstract getPayload(): any

  /**
   * Set Heidelpay instance
   *
   * @param {Heidelpay} heidelpay
   */
  public setHeidelpay(heidelpay: Heidelpay) {
    this._heidelpay = heidelpay
  }

  /**
   * Get instance Heidelpay
   *
   * @returns {Heidelpay}
   */
  public getHeidelpay(): Heidelpay {
    return this._heidelpay
  }

  /**
   * Set Payment Id
   *
   * @param {string} paymentId
   */
  public setId(paymentId: string): void {
    this._id = paymentId
  }

  /**
   * Get Payment Id
   *
   * @returns {string}
   */
  public getId(): string {
    return this._id
  }

  /**
   * Authorize with payment card
   *
   * @param {authorizeObject} args
   * @returns {Promise<Authorization>}
   */
  public authorize(args: authorizeObject): Promise<Authorization> {
    return this.getHeidelpay().authorize(args)
  }

  /**
   * Charge on authorize
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public charge(args: chargeObject): Promise<Charge> {
    return this.getHeidelpay().charge(args)
  }
}
