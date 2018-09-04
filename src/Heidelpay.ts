import { Customer } from './business/Customer'
import { RequestAdapter } from './adapters/RequestAdapter'
import PaymentType from './payments/PaymentType'
import { Config } from './Config'
import { FetchAdapter } from './adapters/FetchAdapter'
import { Authorization } from './payments'
import Charge from './business/Charge'
import { Card, PaymentCard } from './payments/card'
import PaymentAPI from './api/PaymentAPI'
import Payment from './payments/Payment'

/**
 * @export
 * @class Heidelpay
 */
export default class Heidelpay {
  /**
   * Payment API
   *
   * @private
   * @type {PaymentAPI}
   */
  private paymentAPI: PaymentAPI

  /**
   * Private key
   *
   * @private
   * @type {string}
   */
  private privateKey: string

  /**
   * Creates an instance of Heidelpay.
   * @param {string} privateKey
   */
  constructor(privateKey: string) {
    this.privateKey = privateKey
    this.paymentAPI = new PaymentAPI(this)
  }

  /**
   * Get private key
   *
   * @returns {string}
   */
  public getPrivateKey(): string {
    return this.privateKey
  }

  /**
   * Create a payment
   *
   * @param {PaymentType} paymentType
   * @returns {PaymentType}
   */
  public createPaymentType(paymentType: PaymentType): Promise<PaymentType> {
    return this.paymentAPI.createPaymentType(paymentType)
  }

  /**
   * Heidelpay Authorize
   *
   * @param {number} amount
   * @param {string} currency
   * @param {string} typeId
   * @returns {Authorization}
   */
  public authorize(amount: number, currency: string, typeId: string): Authorization {
    return new Authorization(this)
  }

  public charge(amount: number, currency: string, typeId: string) {
    return new Charge(this)
  }

  public chargeAuthorization(paymentId: string, amount: number): Charge {
    return new Charge(this)
  }

  /**
   * Create new customer
   *
   * @param {Customer} customer
   * @returns {Customer}
   */
  public createCustomer(customer: Customer): Promise<Customer> {
    return this.paymentAPI.createCustomer(customer)
  }

  // /**
  //  * Fetch a customer
  //  *
  //  * @param {string} customerId
  //  * @returns {Promise}
  //  */
  // public fetchCustomer(customerId: string): Promise<Response> {
  //   return this.requestAdapter.get(`/customers/${customerId}`)
  // }

  // /**
  //  * Fetch a payment
  //  *
  //  * @param {string} orderId
  //  * @returns {Promise}
  //  */
  // public fetchPayment(orderId: string): Promise<Response> {
  //   return this.requestAdapter.get(`/payments/${orderId}`)
  // }
}
