import Heidelpay from '../Heidelpay'

export default abstract class AbstractPayment {
  private heidelpay: Heidelpay

  constructor(heidelpay: Heidelpay) {
    this.heidelpay = heidelpay
  }

  public getHeidelpay(): Heidelpay {
    return this.heidelpay
  }
}
