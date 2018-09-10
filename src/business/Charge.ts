import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import PaymentEntity from '../payments/PaymentEntity'
import { Customer } from './Customer'
import Resources from '../payments/Resources'

export type chargeObject = {
  amount: number
  currency: string
  returnUrl: string
  typeId: string | PaymentEntity
  customerId: string | Customer
}

export default class Charge extends AbstractPayment {
  private resources: Resources

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources()
  }

  public setResources(resources: Resources): void {
    this.resources = resources
  }

  public getResources(): Resources {
    return this.resources
  }
}
