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
import AbstractPayment from './payments/business/AbstractPayment'
import TransactionItem from './payments/TransactionItem'
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
   * Fetch transaction detail
   *
   * @param {TransactionItem} transactionItem
   * @returns {Promise<AbstractPayment>}
   */
  public fetchTransactionItem(transactionItem: TransactionItem): Promise<AbstractPayment> {
    return this.paymentService.fetchTransactionItem(transactionItem)
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

    if (typeId instanceof AbstractPaymentType) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      return this.paymentService.authorize({ ...args, typeId: paymentType.getId() })
    }

    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      return this.paymentService.authorize({ ...args, customerId: customer.getCustomerId() })
    }

    return this.paymentService.authorize(args)
  }

  /**
   * Heidelpay Charge
   *
   * @param {chargeObject} args
   * @returns {Promise<Charge>}
   */
  public async charge(args: chargeObject): Promise<Charge> {
    const { typeId, customerId } = args

    if (typeId instanceof AbstractPaymentType) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      return this.paymentService.charge({ ...args, typeId: paymentType.getId() })
    }

    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      return this.paymentService.charge({ ...args, customerId: customer.getCustomerId() })
    }

    return this.paymentService.charge(args)
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
