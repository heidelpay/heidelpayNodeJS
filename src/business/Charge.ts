import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import PaymentEntity from '../payments/PaymentEntity'
import { Customer } from './Customer'
import Resources from '../payments/Resources'
/**
 *
 *
 * @export
 * @class Charge
 * @extends {AbstractPayment}
 */
export default class Charge extends AbstractPayment {
  private resources: Resources

  /**
   * Creates an instance of Charge.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
  }

  public getResources(): Resources {
    return this.resources
  }
}

export type chargeObject = {
  amount: number
  currency: string
  returnUrl: string
  typeId: string | PaymentEntity
  customerId: string | Customer
}
