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

  /* @param {Customer} customer
   * @returns {Promise}
   */
  public createCustomer(customer: Customer): Promise<Response> {
    return this.requestAdapter.post('/customers', customer)
  }

  /**
   * Fetch a customer
   *
   * @param {string} customerId
   * @returns {Promise}
   */
  public fetchCustomer(customerId: string): Promise<Response> {
    return this.requestAdapter.get(`/customers/${customerId}`)
  }

  /**
   * Fetch a payment
   *
   * @param {string} orderId
   * @returns {Promise}
   */
  public fetchPayment(orderId: string): Promise<Response> {
    return this.requestAdapter.get(`/payments/${orderId}`)
  }
}
