import { FetchAdapter } from '../adapters/FetchAdapter'
import Heidelpay from '../Heidelpay'
import * as apiURL from '../configs/apiURLs'
import PaymentType from '../payments/PaymentType'
import { Card, PaymentCard } from '../payments/card'
import { Customer, CustomerBuilder } from '../business/Customer'
import { Authorization } from '../payments'
import PaymentEntity from '../payments/AbstractPaymentEntity'
import { authorizeObject, chargeAuthorizeObject } from '../business/Authorization'
import Charge, { chargeObject } from '../business/Charge'
import { replaceUrl } from '../utils/Utils'
import Resources from '../payments/Resources'
import { Cancel, cancelAuthorizeObject } from '../business/Cancel'

export default class PaymentService {
  private requestAdapter: FetchAdapter
  /**
   * Heidelpay object
   *
   * @private
   * @type {Heidelpay}
   */
  private heidelpay: Heidelpay

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
        .setFirstName(customer.getFirstName())
        .setLastName(customer.getLastName())
        .setSalutation(customer.getSalutation())
        .setCustomerId(response.id)
        .setBirthDate(customer.getBirthDate())
        .setEmail(customer.getEmail())
        .setPhone(customer.getPhone())
        .setMobile(customer.getMobile())
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

      const authorize = new Authorization(this.heidelpay)

      const resources = new Resources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      authorize.setResources(resources)
      authorize.setId(response.id)

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

      const charge = new Charge(this.heidelpay)

      const resources = new Resources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      charge.setResources(resources)
      charge.setId(response.id)

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
        replaceUrl(apiURL.URL_PAYMENT_CHARGE_AUTHORIZE, {
          paymentId: args.paymentId
        }),
        payload,
        this.heidelpay.getPrivateKey()
      )

      const charge = new Charge(this.heidelpay)

      const resources = new Resources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      charge.setResources(resources)
      charge.setId(response.id)

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
        replaceUrl(apiURL.URL_PAYMENT_AUTHORIZE_CANCEL, {
          paymentId: args.paymentId,
          authorizationId: args.authorizationId
        }),
        payload,
        this.heidelpay.getPrivateKey()
      )

      const cancel = new Cancel(this.heidelpay)

      const resources = new Resources()
        .setCustomerId(response.resources.customerId)
        .setMetadataId(response.resources.metadataId)
        .setPaymentId(response.resources.paymentId)
        .setTypeId(response.resources.typeId)
        .setRiskId(response.resources.riskId)

      cancel.setResources(resources)
      cancel.setId(response.id)

      resolve(cancel)
    })
  }
}
