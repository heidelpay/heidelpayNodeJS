import Heidelpay from '../../Heidelpay'
import Resources from '../Resources'

export default abstract class AbstractPayment {
  private _id: string
  private _heidelpay: Heidelpay

  /**
   * Creates an instance of AbstractPayment.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    this._heidelpay = heidelpay
    this._id = ''
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

  abstract getResources(): Resources
}
