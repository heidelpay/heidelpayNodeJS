import { Customer } from './business/Customer'
import { RequestAdapter } from './adapters/RequestAdapter'
import PaymentType from './payments/PaymentType'
import { Config } from './Config'
import { FetchAdapter } from './adapters/FetchAdapter'
import { Authorization } from './payments'

/**
 * @export
 * @class Heidelpay
 */
export default class Heidelpay {
  /**
   * A instance of request adapter
   *
   * @private
   * @static
   * @type {RequestAdapter}
   */
  private requestAdapter: RequestAdapter

  /**
   * Creates an instance of Heidelpay.
   * @param {string} privateKey
   */
  constructor(privateKey: string) {
    const config = new Config({ privateKey })
    this.requestAdapter = new FetchAdapter(config)
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

  /**
   * Create a payment
   *
   * @param {PaymentType} paymentType
   * @returns {PaymentType}
   */
  public createPayment(paymentType: PaymentType): PaymentType {
    return paymentType
  }

  /**
   * Heidelpay Authorize
   *
   * @param {number} amount
   * @param {string} currency
   * @param {string} typeId
   * @returns {Authorization}
   */
  public authorize(amount: number, currency: string): Authorization {
    return new Authorization(this)
  }
}
