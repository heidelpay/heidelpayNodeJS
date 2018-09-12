import Heidelpay from '../../Heidelpay'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Resources from '../Resources'
import PaymentType from '../types/PaymentType'
import Cancel, { cancelChargeObject } from './Cancel'

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

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  /**
   * Refund (Cancel of charge)
   *
   * @param {number} [amount]
   * @returns {Promise<Cancel>}
   */
  public cancel(amount?: number): Promise<Cancel> {
    const cancelChargePayload: cancelChargeObject = {
      chargeId: this.getId(),
      paymentId: this.getResources().getPaymentId()
    }

    if (amount) {
      cancelChargePayload.amount = amount
    }

    return this.getHeidelpay().cancelCharge(cancelChargePayload)
  }
}

export type chargeObject = {
  amount: number
  currency: string
  returnUrl: string
  typeId: string | PaymentType
  customerId: string | Customer
}
