import AbstractPayment from './AbstractPayment'
import Authorization from '../business/Authorization'
import Charge from '../business/Charge'
import Heidelpay from '../Heidelpay'

export default class Payment extends AbstractPayment {
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
  }

  /**
   *
   * Authorize with payment
   * @param {number} amount
   * @param {string} currency
   * @returns {Authorization}
   */
  public authorize(amount: number, currency: string, typeId: string): Authorization {
    return this.getHeidelpay().authorize(amount, currency, typeId)
  }

  /**
   *
   * Charge with payment
   * @param {number} amount
   * @param {string} currency
   * @param {string} typeId
   * @returns {Charge}
   */
  public charge(amount: number, currency: string, typeId: string): Charge {
    return this.getHeidelpay().charge(amount, currency, typeId)
  }
}
