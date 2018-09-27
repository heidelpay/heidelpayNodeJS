import { FetchAdapter } from '../adapters/FetchAdapter'
import Heidelpay from '../Heidelpay'
import PaymentType from '../payments/types/PaymentType'
import { Customer } from '../payments/Customer'
import Authorization, { authorizeObject, chargeAuthorizeObject } from '../payments/business/Authorization'
import Cancel, { cancelAuthorizeObject, cancelChargeObject } from '../payments/business/Cancel'
import Charge, { chargeObject } from '../payments/business/Charge'
import Payment from '../payments/business/Payment'
import CreatePaymentType from './CreatePaymentType'
import FetchPayment from './FetchPayment'
import FetchPaymentType from './FetchPaymentType'
import CreateCustomer from './CreateCustomer'
import FetchCustomer from './FetchCustomer'
import AuthorizationService from './Authorization'
import ChargeService from './Charge'
import ChargeAuthorization from './ChargeAuthorization'
import CancelAuthorization from './CancelAuthorization'
import CancelCharge from './CancelCharge'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';
import Shipment from '../payments/business/Shipment';
import ShipmentService from './Shipment';

export default class PaymentService {
  private requestAdapter: FetchAdapter
  private heidelpay: Heidelpay

  constructor(heidelpay: Heidelpay) {
    this.heidelpay = heidelpay
    this.requestAdapter = new FetchAdapter()
  }

  /**
   * Get Heidelpay instance
   *
   * @returns {Heidelpay}
   */
  public getHeidelpay(): Heidelpay {
    return this.heidelpay
  }

  /**
   * Get request adapter
   *
   * @returns {FetchAdapter}
   */
  public getRequestAdapter(): FetchAdapter {
    return this.requestAdapter
  }

  /**
   * Call API to create payment type
   *
   * @param {PaymentType} paymentType
   * @returns {Promise<PaymentType>}
   */
  public createPaymentType(paymentType: AbstractPaymentType): Promise<PaymentType> {
    return CreatePaymentType(paymentType, this)
  }

  /**
   * Fetch a payment
   *
   * @param {string} paymentId
   * @returns {Promise<Payment>}
   */
  public fetchPayment(paymentId: string): Promise<Payment> {
    return FetchPayment(paymentId, this)
  }

  /**
   * Fetch a payment type
   *
   * @param {string} paymentTypeId
   * @returns {Promise<PaymentType>}
   */
  public fetchPaymentType(paymentTypeId: string): Promise<PaymentType> {
    return FetchPaymentType(paymentTypeId, this)
  }

  /**
   * Call API to create customer
   *
   * @param {Customer} customer
   * @returns {Promise<Customer>}
   */
  public createCustomer(customer: Customer): Promise<Customer> {
    return CreateCustomer(customer, this)
  }

  /**
   * Fetch customer info by customer Id
   *
   * @param {string} customerId
   * @returns {Promise<Customer>}
   */
  public fetchCustomer(customerId: string): Promise<Customer> {
    return FetchCustomer(customerId, this)
  }

  /**
   * Update data customer
   *
   * @param {string} customerId
   * @param {Customer} customer
   * @returns {Promise<Customer>}
   */
  public updateCustomer(customerId: string, customer: Customer): Promise<Customer> {
    return UpdateCustomer(customerId, customer, this)
  }

  /**
   * Delete a customer
   *
   * @param {string} customerId
   * @returns {Promise<boolean>}
   */
  public deleteCustomer(customerId: string): Promise<boolean> {
    return DeleteCustomer(customerId, this)
  }

  /**
   * Authorize a payment
   *
   * @param {authorizeObject} args
   * @returns {Promise<Authorization>}
   */
  public authorize(args: authorizeObject): Promise<Authorization> {
    return AuthorizationService(args, this)
  }

  /**
   * Charge a payment
   *
   * @param {chargeObject} args
   * @returns {Promise<Charge>}
   */
  public charge(args: chargeObject): Promise<Charge> {
    return ChargeService(args, this)
  }

  /**
   * Charge after authorization
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public chargeAuthorization(args: chargeAuthorizeObject): Promise<Charge> {
    return ChargeAuthorization(args, this)
  }

  /**
   * Reversal a payment
   *
   * @param {cancelAuthorizeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelAuthorization(args: cancelAuthorizeObject): Promise<Cancel> {
    return CancelAuthorization(args, this)
  }

  /**
   * Refund a payment
   *
   * @param {cancelChargeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelCharge(args: cancelChargeObject): Promise<Cancel> {
    return CancelCharge(args, this)
  }

  public shipment(paymentId: string): Promise<Shipment> {
    return ShipmentService(paymentId, this)
  }
}
