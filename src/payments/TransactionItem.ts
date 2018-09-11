import Heidelpay from '../Heidelpay'
import AbstractPayment from './business/AbstractPayment'

export default class TransactionItem {
  private _heidelpay: Heidelpay
  private _date: string
  private _type: string
  private _url: string
  private _amount: string

  /**
   * Creates an instance of TransactionItem.
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
   * Set date
   *
   * @param {string} date
   * @returns
   */
  public setDate(date: string) {
    this._date = date
    return this
  }

  /**
   * Get date
   *
   * @returns {string}
   */
  public getDate(): string {
    return this._date
  }

  /**
   * Set payment type
   *
   * @param {string} type
   */
  public setType(type: string) {
    this._type = type
    return this
  }

  /**
   * Get payment type
   *
   * @returns {string}
   */
  public getType(): string {
    return this._type
  }

  /**
   * Set url string
   *
   * @param {string} url
   */
  public setUrl(url: string) {
    this._url = url
    return this
  }

  /**
   * Get url string
   *
   * @returns {string}
   */
  public getUrl(): string {
    return this._url
  }

  /**
   * Set amount value
   *
   * @param {string} url
   */
  public setAmount(amount: string) {
    this._amount = amount
    return this
  }

  /**
   * Get amount value
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this._amount
  }

  /**
   * Fetch transaction detail
   *
   * @returns {Promise<AbstractPayment>}
   */
  public fetch(): Promise<AbstractPayment> {
    return this.getHeidelpay().fetchTransactionItem(this)
  }
}
