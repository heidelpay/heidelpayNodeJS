import AbstractPayment from './AbstractPayment'
import Heidelpay from '../../Heidelpay'
import Resources from './Resources'
import Processing from './Processing';

export default class Cancel extends AbstractPayment {
  private amount: string
  private refundId: string
  private resources: Resources
  private processing: Processing

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources()
    this.processing = new Processing()
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
   * Set Amount
   *
   * @param {string} amount
   */
  public setAmount(amount: string) {
    this.amount = amount
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
   * Set refund Id
   *
   * @param {string} refund Id
   */
  public setRefundId(refundId: string) {
    this.refundId = refundId
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
  }

  /**
   * Get Processing
   *
   * @returns {Processing}
   */
  public getProcessing(): Processing {
    return this.processing
  }

  /**
   * Set Processing
   *
   * @param {*} processing
   */
  public setProcessing(processing: any) {
    this.processing
      .setUniqueId(processing.uniqueId)
      .setShortId(processing.shortId)
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
