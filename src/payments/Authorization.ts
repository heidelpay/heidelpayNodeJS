import AbstractPayment from './AbstractPayment'
import Heidelpay from '../Heidelpay'

export default class Authorization extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }

  public charge(): void {
    console.log('Authorization.charge')
  }

  public cancel(): void {
    console.log('Authorization.cancel')
  }
}
