import { Customer } from './payments/Customer'
import PaymentType from './payments/types/PaymentType'
import Authorization, {
  authorizeObject,
  chargeAuthorizeObject
} from './payments/business/Authorization'
import Charge, { chargeObject } from './payments/business/Charge'
import PaymentService from './services/PaymentService'
import Cancel, { cancelAuthorizeObject, cancelChargeObject } from './payments/business/Cancel'
import Payment from './payments/business/Payment'
import AbstractPaymentType from './payments/types/AbstractPaymentType'

export default class Heidelpay {
  private paymentService: PaymentService
  private privateKey: string

  constructor(privateKey: string) {
    this.privateKey = privateKey
    this.paymentService = new PaymentService(this)
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
  public createPaymentType(paymentType: AbstractPaymentType): Promise<PaymentType> {
    return this.paymentService.createPaymentType(paymentType)
  }

  /**
   * Create new customer
   *
   * @param {Customer} customer
   * @returns {Customer}
   */
  public createCustomer(customer: Customer): Promise<Customer> {
    return this.paymentService.createCustomer(customer)
  }

  /**
   * Fetch a customer
   *
   * @param {string} customerId
   * @returns {Promise}
   */
  public fetchCustomer(customerId: string): Promise<Customer> {
    return this.paymentService.fetchCustomer(customerId)
  }

  /**
   * Fetch a payment
   *
   * @param {string} orderId
   * @returns {Promise}
   */
  public fetchPaymentType(paymentTypeId: string): Promise<PaymentType> {
    return this.paymentService.fetchPaymentType(paymentTypeId)
  }

  /**
   * Fetch a payment
   *
   * @param {string} orderId
   * @returns {Promise}
   */
  public fetchPayment(paymentId: string): Promise<Payment> {
    return this.paymentService.fetchPayment(paymentId)
  }

  /**
   * Fetch authorization transaction
   *
   * @param {string} paymentId
   * @returns {Promise<Authorization>}
   */
  public fetchAuthorization(paymentId: string): Promise<Authorization> {
    return new Promise(async (resolve) => {
      const payment = await this.paymentService.fetchPayment(paymentId) as Payment
      resolve(payment.getAuthorization())
    })
  }

  /**
   * Fetch charge transaction
   *
   * @param {string} paymentId
   * @param {string} chargeId
   * @returns {Promise<Charge>}
   */
  public fetchCharge(paymentId: string, chargeId: string): Promise<Charge> {
    return new Promise(async (resolve) => {
      const payment = await this.paymentService.fetchPayment(paymentId) as Payment
      resolve(payment.getCharge(chargeId))
    })
  }

  /**
   * Fetch cancel transaction
   *
   * @param {string} paymentId
   * @param {string} refundId
   * @param {string} cancelId
   * @returns {Promise<Cancel>}
   */
  public fetchCancel(paymentId: string, refundId: string, cancelId: string): Promise<Cancel> {
    return new Promise(async (resolve) => {
      const payment = await this.paymentService.fetchPayment(paymentId) as Payment
      resolve(payment.getCancel(cancelId, refundId))
    })
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
    let { typeId, customerId } = args

    // If typeId is a instance of PaymentType (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (typeId instanceof AbstractPaymentType) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      typeId = paymentType.getId()
    }

    // If customerId is a instance of Customer (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      customerId = customer.getCustomerId()
    }

    return this.paymentService.authorize({ ...args, typeId: typeId, customerId: customerId })
  }

  /**
   * Heidelpay Charge
   *
   * @param {chargeObject} args
   * @returns {Promise<Charge>}
   */
  public async charge(args: chargeObject): Promise<Charge> {
    let { typeId, customerId } = args

    // If typeId is a instance of PaymentType (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (typeId instanceof AbstractPaymentType) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      typeId = paymentType.getId()
    }

    // If customerId is a instance of Customer (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      customerId = customer.getCustomerId()
    }

    return this.paymentService.charge({ ...args, typeId: typeId, customerId: customerId })
  }

  /**
   * Heidelpay Charge after authorization
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public chargeAuthorization(args: chargeAuthorizeObject): Promise<Charge> {
    return this.paymentService.chargeAuthorization(args)
  }

  /**
   * Reversal (Cancel of authorize)
   *
   * @param {cancelAuthorizeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelAuthorization(args: cancelAuthorizeObject): Promise<Cancel> {
    return this.paymentService.cancelAuthorization(args)
  }

  /**
   * Cancel charge
   *
   * @param {cancelChargeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelCharge(args: cancelChargeObject): Promise<Cancel> {
    return this.paymentService.cancelCharge(args)
  }
}
