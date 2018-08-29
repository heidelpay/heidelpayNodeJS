import { Customer } from './entities/Customer'
import { IRequestAdapter } from './adapters/IRequestAdapter'

/**
 * @export
 * @class Heidelpay
 */
export default class Heidelpay {
  /**
   * A instance heideplay
   *
   * @private
   * @static
   * @type {Heidelpay}
   */
  private static instance: Heidelpay

  /**
   * A instance of request adapter
   *
   * @private
   * @static
   * @type {IRequestAdapter}
   */
  private static requestAdapter: IRequestAdapter

  /**
   * Should private constructor
   */
  private constructor() {}

  /**
   * Get a instance of Heidelpay class
   *
   * @static
   * @returns {Heidelpay}
   */
  public static getInstance(): Heidelpay {
    if (!Heidelpay.instance) {
      Heidelpay.instance = new Heidelpay()
    }

    return Heidelpay.instance
  }

  /**
   * @param  {IRequestAdapter} adapter
   */
  public static setRequestAdapter(adapter: IRequestAdapter): void {
    this.requestAdapter = adapter
  }

  /**
   * Create a customer
   *
   * @param {Customer} customer
   * @returns {Customer}
   */
  public createCustomer(customer: Customer): Customer {
    return customer
  }
}
