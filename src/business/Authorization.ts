import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import { Customer } from './Customer'
import PaymentEntity from '../payments/PaymentEntity'

export type authorizeObject = {
  amount: number
  currency: string
  typeId: string | PaymentEntity
  customerId?: string | Customer
  returnURL?: string
}

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
