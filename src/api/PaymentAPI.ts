import { FetchAdapter } from '../adapters/FetchAdapter'
import { RequestAdapter } from '../adapters/RequestAdapter'
import Heidelpay from '../Heidelpay'
import * as ApiURL from '../constants/ApiUrls'
import PaymentType from '../payments/PaymentType'
import { Card, PaymentCard } from '../payments/card'
import { Customer } from '../business/Customer'

export default class PaymentService {
  private requestAdapter: RequestAdapter
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

  public createPaymentType(paymentType: PaymentType): Promise<PaymentType> {
    return new Promise(async (resolve, reject) => {
      if (paymentType instanceof Card) {
        const cardPayload = {
          pan: paymentType.getPanNumber(),
          cvc: paymentType.getCVC(),
          expiryDate: paymentType.getExpiryDate()
        }

        const response: any = await this.requestAdapter.post(
          ApiURL.API_TYPE_CARD,
          cardPayload,
          this.heidelpay.getPrivateKey()
        )
        const paymentCard = new PaymentCard(this.heidelpay)

        paymentCard.setId(response.id)
        resolve(paymentCard)
      }

      reject()
    })
  }

  public createCustomer(customer: Customer): Promise<Customer> {
    return new Promise(async resolve => {
      const customerPayload = {
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
        ApiURL.API_CUSTOMER,
        customerPayload,
        this.heidelpay.getPrivateKey()
      )
      customer.setId(response.id)

      resolve(customer)
    })
  }
}
