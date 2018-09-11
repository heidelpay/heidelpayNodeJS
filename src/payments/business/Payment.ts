import AbstractPayment from './AbstractPayment'
import Heidelpay from '../../Heidelpay'
import Resources from '../Resources'
import Transactions from '../Transactions'

export default class Payment extends AbstractPayment {
  private resources: Resources
  private transactions: Transactions

  /**
   * Creates an instance of Payment.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
    this.transactions = new Transactions(heidelpay)
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  public getTransactions(): Transactions {
    return this.transactions
  }
}
