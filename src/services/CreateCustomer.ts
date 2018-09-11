import * as apiURL from '../configs/apiURLs'
import PaymentService from './PaymentService'
import { Customer } from '../payments/Customer'

export default (customer: Customer, paymentService: PaymentService): Promise<Customer> => {
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

    const response: any = await paymentService
      .getRequestAdapter()
      .post(apiURL.URL_CUSTOMER, payload, paymentService.getHeidelpay().getPrivateKey())

    const newCustomer = new Customer()
      .setCustomerId(response.id)
      .setFirstName(customer.getFirstName())
      .setLastName(customer.getLastName())
      .setSalutation(customer.getSalutation())
      .setBirthDate(customer.getBirthDate())
      .setEmail(customer.getEmail())
      .setPhone(customer.getPhone())
      .setMobile(customer.getMobile())

    resolve(newCustomer)
  })
}
