import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import PaymentEntity from '../payments/PaymentEntity'
import { Customer } from './Customer'

export type chargeObject = {
  amount: number
  currency: string
  returnUrl: string
  typeId: string | PaymentEntity
  customerId: string | Customer
}

export default class Charge extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }
}
