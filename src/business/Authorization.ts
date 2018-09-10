import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import { Customer } from './Customer'
import PaymentEntity from '../payments/PaymentEntity'
import Charge from './Charge'
import Resources from '../payments/Resources'
import { Cancel, cancelAuthorizeObject } from './Cancel'
/**
 * Class Authorization
 *
 * @export
 * @class Authorization
 * @extends {AbstractPayment}
 */
export default class Authorization extends AbstractPayment {
  private resources: Resources

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources()
  }

  /**
   * Charge after authorize
   *
   * @param {number} [amount]
   * @returns {Promise<Charge>}
   */
  public charge(amount?: number): Promise<Charge> {
    const chargeAuthorizePayload: chargeAuthorizeObject = {
      paymentId: this.getResources().getPaymentId()
    }

    if (amount) {
      chargeAuthorizePayload.amount = amount
    }

    return this.getHeidelpay().chargeAuthorization(chargeAuthorizePayload)
  }

  /**
   * Reversal (Cancel of authorization)
   *
   * @param {number} [amount]
   * @returns {Promise<Cancel>}
   */
  public cancel(amount?: number): Promise<Cancel> {
    const cancelAuthorizePayload: cancelAuthorizeObject = {
      authorizationId: this.getId(),
      paymentId: this.getResources().getPaymentId()
    }

    if (amount) {
      cancelAuthorizePayload.amount = amount
    }

    return this.getHeidelpay().cancelAuthorization(cancelAuthorizePayload)
  }

  /**
   * Set resources
   *
   * @param {Resources} resources
   */
  public setResources(resources: Resources): void {
    this.resources = resources
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }
}

export type authorizeObject = {
  amount: number
  currency: string
  typeId: string | PaymentEntity
  returnUrl: string
  customerId?: string | Customer
}

export type chargeAuthorizeObject = {
  paymentId: string
  amount?: number
}
