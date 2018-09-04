import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'

export default class Authorization extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }

  public charge(paymentId: string, amount: number): void {
    this.getHeidelpay().chargeAuthorization(paymentId, amount)
  }

  public cancel(): void {
    console.log('Authorization.cancel')
  }
}
