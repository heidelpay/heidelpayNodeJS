import { FetchAdapter } from '../adapters/FetchAdapter'
import Heidelpay from '../Heidelpay'
import * as apiURL from '../configs/ApiUrls'
import PaymentType from '../payments/PaymentType'
import { Card, PaymentCard } from '../payments/card'
import { Customer, CustomerBuilder } from '../business/Customer'
import { Authorization } from '../payments'
import PaymentEntity from '../payments/AbstractPaymentEntity'
import { authorizeObject, chargeAuthorizeObject } from '../business/Authorization'
import Charge, { chargeObject } from '../business/Charge'
import * as Utils from '../utils/Utils'
import Resources from '../payments/Resources'
import { Cancel, cancelAuthorizeObject } from '../business/Cancel'

/**
 * Class Payment API
 *
 * @export
 * @class PaymentAPI
 */
export default class PaymentAPI {
  private requestAdapter: FetchAdapter
  /**
   * Heidelpay object
   *
   * @private
   * @type {Heidelpay}
   */
  private heidelpay: Heidelpay

  /**
   * Creates an instance of PaymentAPI.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    this.heidelpay = heidelpay
    this.requestAdapter = new FetchAdapter()
  }

  /**
   * Call API to create payment type
   *
   * @param {PaymentType} paymentType
   * @returns {Promise<PaymentType>}
   */
  public createPaymentType(paymentEntity: PaymentEntity): Promise<PaymentType> {
    return new Promise(async (resolve, reject) => {
      if (paymentEntity instanceof Card) {
        const payload = {
          pan: paymentEntity.getPanNumber(),
          cvc: paymentEntity.getCVC(),
          expiryDate: paymentEntity.getExpiryDate()
        }

        const response: any = await this.requestAdapter.post(
          apiURL.URL_TYPE_CARD,
          payload,
          this.heidelpay.getPrivateKey()
        )
        const paymentCard = new PaymentCard(this.heidelpay)

        paymentCard.setId(response.id)
        resolve(paymentCard)
      }

      reject()
    })
  }

  /**
   * Call API to create customer
   *
   * @param {Customer} customer
   * @returns {Promise<Customer>}
   */
  public createCustomer(customer: Customer): Promise<Customer> {
    return new Promise(async resolve => {
      const payload = {
        lastname: customer.getLastName(),
        firstname: customer.getFirstName(),
        salutation: customer.getSalutation(),
        birthDate: customer.getBirthDate(),
        email: customer.getEmail(),
        phone: customer.getPhone(),
        mobile: customer.getMobile(),
        address: customer.getAddress()
      }

      const response: any = await this.requestAdapter.post(
        apiURL.URL_CUSTOMER,
        payload,
        this.heidelpay.getPrivateKey()
      )

      const newCustomer = new CustomerBuilder()
        .setCustomerId(response.id)
        .setFirstName(customer.getFirstName())
        .setLastName(customer.getLastName())
        .setSalutation(customer.getSalutation())
        .setBirthDate(customer.getBirthDate())
        .setEmail(customer.getEmail())
        .setPhone(customer.getPhone())
        .setMobile(customer.getMobile())
        .create()

      resolve(newCustomer)
    })
  }

  /**
   * Fetch customer info by customer Id
   *
   * @param {string} customerId
   * @returns {Promise<Customer>}
   */
  public fetchCustomer(customerId: string): Promise<Customer> {
    return new Promise(async resolve => {
      const response: any = await this.requestAdapter.get(
        Utils.replaceUrl(apiURL.URL_CUSTOMER_FETCH, {
          customerId: customerId
        }),
        this.heidelpay.getPrivateKey()
      )

      const newCustomer = new CustomerBuilder()
        .setFirstName(response.firstname)
        .setLastName(response.lastname)
        .setSalutation(response.salutation)
        .setCustomerId(response.id)
        .setBirthDate(response.birthDate)
        .setEmail(response.email)
        .setPhone(response.phone)
        .setMobile(response.mobile)
        .create()

      resolve(newCustomer)
    })
  }

  /**
   * Authorize a payment
   *
   * @param {authorizeObject} args
   * @returns {Promise<Authorization>}
   */
  public authorize(args: authorizeObject): Promise<Authorization> {
    return new Promise(async resolve => {
      const { amount, currency, typeId, customerId, returnUrl } = args
      let payload: any = {
        amount: amount,
        currency: currency,
        resources: {
          typeId: typeId
        }
      }

      if (customerId) {
        payload.resources.customerId = customerId
      }

      if (returnUrl) {
        payload.returnUrl = returnUrl
      }

      const response: any = await this.requestAdapter.post(
        apiURL.URL_PAYMENT_AUTHORIZE,
        payload,
        this.heidelpay.getPrivateKey()
      )

      // New Authorize with Hedeipay instance
      const authorize = new Authorization(this.heidelpay)

      // Set authorizeId
      authorize.setId(response.id)

      // Set resources
      authorize
        .getResources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      resolve(authorize)
    })
  }

  /**
   * Charge a payment
   *
   * @param {chargeObject} args
   * @returns {Promise<Charge>}
   */
  public charge(args: chargeObject): Promise<Charge> {
    return new Promise(async resolve => {
      const { amount, currency, returnUrl, customerId, typeId } = args
      let payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          customerId: customerId,
          typeId: typeId
        }
      }

      const response: any = await this.requestAdapter.post(
        apiURL.URL_PAYMENT_CHARGE,
        payload,
        this.heidelpay.getPrivateKey()
      )

      // New Charge with Hedeipay instance
      const charge = new Charge(this.heidelpay)

      // Set chargeId
      charge.setId(response.id)

      // Set resources
      charge
        .getResources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      resolve(charge)
    })
  }

  /**
   * Charge after authorization
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public chargeAuthorization(args: chargeAuthorizeObject): Promise<Charge> {
    return new Promise(async resolve => {
      let payload: any = {}

      if (args.amount) {
        payload.amount = args.amount
      }

      const response: any = await this.requestAdapter.post(
        Utils.replaceUrl(apiURL.URL_PAYMENT_CHARGE_AUTHORIZE, {
          paymentId: args.paymentId
        }),
        payload,
        this.heidelpay.getPrivateKey()
      )

      // New Charge with Hedeipay instance
      const charge = new Charge(this.heidelpay)

      // Set charge Id
      charge.setId(response.id)

      // Set resources
      charge
        .getResources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      resolve(charge)
    })
  }

  /**
   * Reversal a payment
   *
   * @param {cancelAuthorizeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelAuthorization(args: cancelAuthorizeObject): Promise<Cancel> {
    return new Promise(async resolve => {
      let payload: any = {}

      if (args.amount) {
        payload.amount = args.amount
      }

      const response: any = await this.requestAdapter.post(
        Utils.replaceUrl(apiURL.URL_PAYMENT_AUTHORIZE_CANCEL, {
          paymentId: args.paymentId,
          authorizationId: args.authorizationId
        }),
        payload,
        this.heidelpay.getPrivateKey()
      )

      // New Cancel with Hedeipay instance
      const cancel = new Cancel(this.heidelpay)

      // Set cancel Id
      cancel.setId(response.id)

      // Set resources
      cancel
        .getResources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      resolve(cancel)
    })
  }
}
