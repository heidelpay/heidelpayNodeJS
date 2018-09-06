import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import { Customer } from './Customer'
import PaymentEntity from '../payments/PaymentEntity'

export type authorizeObject = {
  amount: number
  currency: string
  typeId: string | PaymentEntity
  customerId?: string | Customer
  returnUrl?: string
}

export default class Authorization extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }
}
