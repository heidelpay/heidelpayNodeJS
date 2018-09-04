import Heidelpay from '../Heidelpay'

export default abstract class AbstractPayment {
  private _id: string
  private _heidelpay: Heidelpay

  constructor(heidelpay: Heidelpay) {
    this._heidelpay = heidelpay
    this._id = ''
  }

  public setId(paymentId: string): void {
    this._id = paymentId
  }

  public getId(): string {
    return this._id
  }

  public getHeidelpay(): Heidelpay {
    return this._heidelpay
  }
}
