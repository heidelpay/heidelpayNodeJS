/*
 * @Author: Minh Tri Nguyen 
 * @Date: 2018-11-20 12:07:38 
 * @Last Modified by: Minh Tri Nguyen
 * @Last Modified time: 2018-11-20 12:08:41
 */
import Heidelpay from '../../Heidelpay'
import Resources from './Resources'
import Payment from './Payment';

export default abstract class AbstractPayment {
  private _id: string
  private _heidelpay: Heidelpay
  private _payment: Payment
  private _payload: object

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

  /**
   * Get payload object
   *
   * @returns {*}
   */
  public getPayload(): any {
    return this._payload
  }

  /**
   * Set payload object
   *
   * @param {*} payload
   * @returns
   */
  public setPayload(payload: any) {
    return this._payload = payload
  }

  abstract getResources(): Resources
}
