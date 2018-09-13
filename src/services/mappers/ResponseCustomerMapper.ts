import { Customer } from '../../payments/Customer'

export default (response: any, customer: Customer | undefined = undefined): Customer => {
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

    return newCustomer
  }

  const newCustomer = new Customer()
    .setCustomerId(response.id)
    .setFirstName(response.firstname)
    .setLastName(response.lastname)
    .setSalutation(response.salutation)
    .setBirthDate(response.birthDate)
    .setEmail(response.email)
    .setPhone(response.phone)
    .setMobile(response.mobile)

  return newCustomer
}
