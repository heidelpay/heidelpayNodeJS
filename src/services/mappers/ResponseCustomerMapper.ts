import { Customer } from '../../payments/Customer'

export default (response: any, customer: Customer | undefined = undefined): Customer => {
  // For create new customer
  if (customer) {
    const newCustomer = new Customer()
      .setCustomerId(response.id)
      .setFirstName(customer.getFirstName())
      .setLastName(customer.getLastName())
      .setSalutation(customer.getSalutation())
      .setBirthDate(customer.getBirthDate())
      .setEmail(customer.getEmail())
      .setPhone(customer.getPhone())
      .setMobile(customer.getMobile())
      .setBillingAddress(customer.getBillingAddress())
      .setShippingAddress(customer.getShippingAddress())
      .setCompanyInfo(customer.getCompanyInfo())

    return newCustomer
  }

  // For fetch or update customer
  const newCustomer = new Customer()
    .setCustomerId(response.id)
    .setFirstName(response.firstname)
    .setLastName(response.lastname)
    .setSalutation(response.salutation)
    .setBirthDate(response.birthDate)
    .setEmail(response.email)
    .setPhone(response.phone)
    .setMobile(response.mobile)
    .setBillingAddress(response.billingAddress)
    .setShippingAddress(response.shippingAddress)
    .setCompanyInfo(response.companyInfo)

  return newCustomer
}
