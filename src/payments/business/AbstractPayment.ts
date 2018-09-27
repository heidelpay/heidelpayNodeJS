import Heidelpay from '../../Heidelpay'
import Resources from './Resources'
import Payment from './Payment';

export default abstract class AbstractPayment {
  private _id: string
  private _heidelpay: Heidelpay
  private _payment: Payment

  constructor(heidelpay: Heidelpay) {
    this._heidelpay = heidelpay
    this._id = ''
  }

  /**
   * Set a payment object
   *
   * @param {Payment} payment
   */
  public setPayment(payment: Payment) {
    this._payment = payment
  }

  /**
   * Get payment object
   *
   * @returns {Payment}
   */
  public getPayment(): Payment {
    return this._payment
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
