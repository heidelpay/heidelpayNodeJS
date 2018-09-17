import AbstractPayment from './AbstractPayment'
import Heidelpay from '../../Heidelpay'
import Resources from '../Resources'

export default class Cancel extends AbstractPayment {
  private resources: Resources
  private refundId: string

  /**
   * Creates an instance of Cancel.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
  }

  /**
   * Set refund Id
   *
   * @param {string} refund Id
   */
  public setRefundId(refundId: string) {
    this.refundId = refundId
  }

  /**
   * Get refund Id
   *
   * @returns {string}
   */
  public getRefundId(): string {
    return this.refundId
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

export type cancelAuthorizeObject = {
  paymentId: string
  authorizationId: string
  amount?: number
}

export type cancelChargeObject = {
  paymentId: string
  chargeId: string
  amount?: number
}
