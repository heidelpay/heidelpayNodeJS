import { Customer } from './business/Customer'
import PaymentType from './payments/PaymentType'
import { Authorization } from './payments'
import Charge, { chargeObject } from './business/Charge'
import PaymentAPI from './api/PaymentAPI'
import PaymentEntity from './payments/PaymentEntity'
import AbstractPaymentEntity from './payments/AbstractPaymentEntity'
import { authorizeObject } from './business/Authorization'

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
  public createPaymentType(paymentEntity: PaymentEntity): Promise<PaymentType> {
    return this.paymentAPI.createPaymentType(paymentEntity)
  }

  /**
   * Heidelpay Authorize
   *
   * @param {number} amount
   * @param {string} currency
   * @param {string} typeId
   * @returns {Authorization}
   */
  public async authorize(args: authorizeObject): Promise<Authorization> {
    const { typeId, customerId } = args

    if (typeId instanceof AbstractPaymentEntity) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      return this.paymentAPI.authorize({ ...args, typeId: paymentType.getId() })
    }

    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      return this.paymentAPI.authorize({ ...args, customerId: customer.getCustomerId() })
    }

    return this.paymentAPI.authorize(args)
  }

  public async charge(args: chargeObject): Promise<Charge> {
    const { typeId, customerId } = args

    if (typeId instanceof AbstractPaymentEntity) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      return this.paymentAPI.charge({ ...args, typeId: paymentType.getId() })
    }

    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      return this.paymentAPI.charge({ ...args, customerId: customer.getCustomerId() })
    }

    return this.paymentAPI.charge(args)
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
