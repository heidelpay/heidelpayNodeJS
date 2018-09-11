import * as apiURL from '../configs/apiURLs'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import { Customer } from '../payments/Customer'

export default (customerId: string, paymentService: PaymentService): Promise<Customer> => {
  return new Promise(async resolve => {
    const response: any = await paymentService.getRequestAdapter().get(
      Utils.replaceUrl(apiURL.URL_CUSTOMER_FETCH, {
        customerId: customerId
      }),
      paymentService.getHeidelpay().getPrivateKey()
    )

    const newCustomer = new Customer()
      .setFirstName(response.firstname)
      .setLastName(response.lastname)
      .setSalutation(response.salutation)
      .setCustomerId(response.id)
      .setBirthDate(response.birthDate)
      .setEmail(response.email)
      .setPhone(response.phone)
      .setMobile(response.mobile)

    resolve(newCustomer)
  })
}
