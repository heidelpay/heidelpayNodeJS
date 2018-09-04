import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'

export default class Charge extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }

  public cancel(): void {
    console.log('Charge.cancel')
  }
}
