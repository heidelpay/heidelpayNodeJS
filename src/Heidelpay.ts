import { Customer } from './entities/Customer'

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
   * Create a customer
   *
   * @param {Customer} customer
   * @returns {Customer}
   */
  public createCustomer(customer: Customer): Customer {
    return customer
  }
}
