import { FetchAdapter } from '../adapters/FetchAdapter'
import Heidelpay from '../Heidelpay'
import * as apiURL from '../configs/apiURLs'
import PaymentType from '../payments/PaymentType'
import { Card, PaymentCard } from '../payments/card'
import { Customer, CustomerBuilder, Salutation } from '../business/Customer'
import { Authorization } from '../payments'
import PaymentEntity from '../payments/AbstractPaymentEntity'

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

  public authorize(
    amount: number,
    currency: string,
    typeId: string | PaymentEntity,
    customerId?: string
  ): Promise<Authorization> {
    return new Promise(async resolve => {
      const payload = {
        amount: amount,
        currency: currency,
        returnUrl: 'http://vnexpress.vn',
        resources: {
          customerId: customerId,
          typeId: typeId
        }
      }

      const response: any = await this.requestAdapter.post(
        apiURL.URL_PAYMENT_AUTHORIZE,
        payload,
        this.heidelpay.getPrivateKey()
      )

      const authorize = new Authorization(this.heidelpay)

      authorize.setId(response.id)
      resolve(authorize)
    })
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
}
