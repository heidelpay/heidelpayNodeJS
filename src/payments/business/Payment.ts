import AbstractPayment from './AbstractPayment'
import Heidelpay from '../../Heidelpay'
import Resources from '../Resources'
import Authorization from './Authorization'
import Charge from './Charge'
import Cancel from './Cancel'

export default class Payment extends AbstractPayment {
  private resources: Resources
  private authorization: Authorization
  private chargeList: Array<Charge>
  private cancelList: Array<Cancel>

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
   * Set authorize transaction
   *
   * @param {Authorization} authorization
   */
  public setAuthorization(authorization: Authorization) {
    this.authorization = authorization
  }

  /**
   * Get authorize transaction
   *
   * @returns {Authorization}
   */
  public getAuthorization(): Authorization {
    return this.authorization
  }

  /**
   * Set list charge transactions
   *
   * @param {Array<Charge>} chargeList
   */
  public setChargeList(chargeList: Array<Charge>) {
    this.chargeList = chargeList
  }

  /**
   * Get list charge transactions
   *
   * @returns {Array<Charge>}
   */
  public getChargeList(): Array<Charge> {
    return this.chargeList
  }

  /**
   * Get charge transaction
   *
   * @param {string} chargeId
   * @returns {Charge}
   */
  public getCharge(chargeId: string): Charge {
    const chargeItem = this.getChargeList().find(
      (item: Charge) => item.getId() === chargeId
    ) as Charge

    if (chargeItem.getId()) {
      return chargeItem
    }

    throw new Error(`Charge Id is not found in list of transaction`)
  }

  /**
   * Set list cancel transactions
   *
   * @param {Array<Cancel>} chargeList
   */
  public setCancelList(cancelList: Array<Cancel>) {
    this.cancelList = cancelList
  }

  /**
   * Get list cancel transactions
   *
   * @returns {Array<Cancel>}
   */
  public getCancelList(): Array<Cancel> {
    return this.cancelList
  }

  /**
   * Get cancel transaction
   *
   * @param {string} cancelId
   * @returns {Cancel}
   */
  public getCancel(cancelId: string, refundId: string = 's-aut-1'): Cancel {
    const cancelItem = this.getCancelList().find(
      (item: Cancel) => item.getId() === cancelId && item.getRefundId() === refundId
    ) as Cancel

    if (cancelItem.getId()) {
      return cancelItem
    }

    throw new Error(`Cancel Id is not found in list of transaction`)
  }
}
