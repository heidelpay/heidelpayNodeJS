import Heidelpay from '../../Heidelpay'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Resources from './Resources'
import PaymentType from '../types/PaymentType'
import Cancel, { cancelChargeObject } from './Cancel'
import Processing from './Processing';

export default class Charge extends AbstractPayment {
  private amount: string
  private resources: Resources
  private cancelList: Array<Cancel>
  private processing: Processing

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
    this.processing = new Processing()
  }

  /**
   * Get amount
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this.amount
  }

  /**
   * Set amount
   *
   * @param {string} amount
   */
  public setAmount(amount: string) {
    this.amount = amount
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

  /**
   * Get cancel transaction
   *
   * @param {string} cancelId
   * @returns {Cancel}
   */
  public getCancel(cancelId: string): Cancel {
    const cancelItem = this.getCancelList().find((item: Cancel) => item.getId() === cancelId) as Cancel

    if (cancelItem && cancelItem.getId()) {
      return cancelItem
    }

    throw new Error(`Cancel Id is not found in list of transaction`)
  }

  /**
   * Get list of cancel transactions
   *
   * @returns {Array<Cancel>}
   */
  public getCancelList(): Array<Cancel> {
    return this.cancelList
  }

  /**
   * Set list of cancel transactions
   *
   * @param {Array<Cancel>} cancelList
   */
  public setCancelList(cancelList: Array<Cancel>) {
    this.cancelList = cancelList
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
  customerId?: string | Customer
}
