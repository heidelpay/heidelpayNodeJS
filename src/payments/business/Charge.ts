import Heidelpay from '../../Heidelpay'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Resources from '../Resources'
import PaymentType from '../types/PaymentType'
import Cancel, { cancelChargeObject } from './Cancel'

export default class Charge extends AbstractPayment {
  private amount: string
  private resources: Resources
  private cancelList: Array<Cancel>

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
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
   * Get amount
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this.amount
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

  public setCancelList(cancelList: Array<Cancel>) {
    this.cancelList = cancelList
  }

  public getCancelList(): Array<Cancel> {
    return this.cancelList
  }

  public getCancel(cancelId: string): Cancel {
    const cancelItem = this.getCancelList().find((item: Cancel) => item.getId() === cancelId) as Cancel

    if (cancelItem && cancelItem.getId()) {
      return cancelItem
    }

    throw new Error(`Cancel Id is not found in list of transaction`)
  }
}

export type chargeObject = {
  amount: number
  currency: string
  returnUrl: string
  typeId: string | PaymentType
  customerId?: string | Customer
}
