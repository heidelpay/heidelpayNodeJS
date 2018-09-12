import Heidelpay from '../Heidelpay'
import TransactionItem from './TransactionItem'
import AbstractPayment from './business/AbstractPayment'

export default class Transactions {
  private _heidelpay: Heidelpay
  private _listTransaction: Array<TransactionItem>

  /**
   * Creates an instance of Transactions.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    this._heidelpay = heidelpay
  }

  /**
   * Get Heidelpay
   *
   * @returns
   */
  public getHeidelpay(): Heidelpay {
    return this._heidelpay
  }

  /**
   * Set list transactions
   *
   * @param {Array<TransactionItem>} listTransaction
   */
  public setList(listTransaction: Array<TransactionItem>): void {
    this._listTransaction = listTransaction
  }

  /**
   * Get list transactions
   *
   * @returns {Array<TransactionItem>}
   */
  public getList(): Array<TransactionItem> {
    return this._listTransaction
  }

  /**
   * Fetch item transaction
   *
   * @param {number} index
   * @returns {Promise<AbstractPayment>}
   */
  public fetchTransactionItem(index: number): Promise<AbstractPayment> | {} {
    const itemTransaction: any = this._listTransaction[index]

    if (itemTransaction) {
      return this.getHeidelpay().fetchTransactionItem(itemTransaction)
    }

    return {}
  }
}
