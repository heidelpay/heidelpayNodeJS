import AbstractPayment from './AbstractPayment'
import Heidelpay from '../Heidelpay'

export default class Payment extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }
}
