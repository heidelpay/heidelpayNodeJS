import Heidelpay from '../../Heidelpay'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Charge from './Charge'
import Resources from '../Resources'
import Cancel, { cancelAuthorizeObject } from './Cancel'
import PaymentType from '../types/PaymentType'

export default class Authorization extends AbstractPayment {
  private amount: string
  private resources: Resources

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
  }

  /**
   * Set Amount
   *
   * @param {string} amount
   */
  public setAmount(amount: string) {
    this.amount = amount
  }

  /**
   * Get Amount
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this.amount
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
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  /**
   * Set resources
   *
   * @param {*} resources
   */
  public setResources(resources: any) {
    this.resources
    .setCustomerId(resources.customerId)
    .setMetadataId(resources.metadataId)
    .setPaymentId(resources.paymentId)
    .setTypeId(resources.typeId)
    .setRiskId(resources.riskId)
  }
}

export type authorizeObject = {
  amount: number
  currency: string
  typeId: string | PaymentType
  returnUrl: string
  customerId?: string | Customer
}

export type chargeAuthorizeObject = {
  paymentId: string
  amount?: number
}
