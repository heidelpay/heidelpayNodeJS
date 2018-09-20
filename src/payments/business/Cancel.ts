import AbstractPayment from './AbstractPayment'
import Heidelpay from '../../Heidelpay'
import Resources from '../Resources'

export default class Cancel extends AbstractPayment {
  private amount: string
  private resources: Resources
  private refundId: string

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
