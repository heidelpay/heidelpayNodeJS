import { CustomerBuilder, Customer, Salutation, Address } from '../../src/business/Customer'
import Heidelpay from '../../src/Heidelpay'

let heidelpay

describe('Customer test', () => {
  beforeEach(() => {
    heidelpay = new Heidelpay('s-pri-xxx')
  })

  it('Test create Customer Builder', () => {
    const customer: Customer = new CustomerBuilder().create()

    expect(customer).toBeInstanceOf(Customer)
  })

  it('Test set firstName and lastName into customer builder', () => {
    const address: Address = {
      name: 'Peter Universum',
      street: 'Hugo-Junkers-Str. 5',
      state: 'DE-BO',
      zip: '60386',
      city: 'Frankfurt am Main',
      country: 'DE'
    }

    const customer: Customer = new CustomerBuilder()
      .setFirstName('John')
      .setLastName('Doe')
      .setSalutation(Salutation.mr)
      .setCustomerId('45678')
      .setBirthDate('1972-12-24')
      .setEmail('John.Doe@heidelpay.com')
      .setPhone('+49 6221 64 71 100')
      .setMobile('+49 172 123 456')
      .setAddress(address)
      .create()

    expect(customer.getFirstName()).toEqual('John')
    expect(customer.getLastName()).toEqual('Doe')
    expect(customer.getSalutation()).toEqual(Salutation.mr)
    expect(customer.getCustomerId()).toEqual('45678')
    expect(customer.getBirthDate()).toEqual('1972-12-24')
    expect(customer.getEmail()).toEqual('John.Doe@heidelpay.com')
    expect(customer.getPhone()).toEqual('+49 6221 64 71 100')
    expect(customer.getMobile()).toEqual('+49 172 123 456')
    expect(customer.getAddress()).toEqual(address)
  })

  it('Test Heidelpay class create Customer', () => {
    const customer: Customer = new CustomerBuilder()
      .setFirstName('John')
      .setLastName('Doe')
      .setSalutation(Salutation.mr)
      .setCustomerId('45678')
      .setBirthDate('1972-12-24')
      .setEmail('John.Doe@heidelpay.com')
      .setPhone('+49 6221 64 71 100')
      .setMobile('+49 172 123 456')
      .create()

    const newCustomer = heidelpay.createCustomer(customer)
    expect(newCustomer).toBeInstanceOf(Promise)
  })
})
