import { Customer, Salutation, Address } from '../../src/payments/Customer'
import Heidelpay from '../../src/Heidelpay'
import * as TestHelper from '../helpers/TestHelper'
import * as TestCustomerHelper from '../helpers/CustomerTestHelper'

describe('Customer test', () => {
  let heidelpay: Heidelpay
  const { 
    createMiniumCustomer, 
    createFullCustomerWithComapanyInfoRegister,
    createFullCustomerWithComapanyInfoNotRegister
  } = TestCustomerHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test create minium customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createMiniumCustomer())

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getFirstName()).toEqual(createMiniumCustomer().getFirstName())
    expect(customer.getLastName()).toEqual(createMiniumCustomer().getLastName())
  })

  it('Test create full customer with company register', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoRegister()
    const customer: Customer = await heidelpay.createCustomer(fullCustomer)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toBeDefined()
    expect(customer.getBillingAddress()).toEqual(fullCustomer.getBillingAddress())
    expect(customer.getShippingAddress()).toEqual(fullCustomer.getShippingAddress())
    expect(customer.getCompanyInfo()).toEqual(fullCustomer.getCompanyInfo())
  })

  it('Test create full customer with company not register', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoNotRegister()
    const customer: Customer = await heidelpay.createCustomer(fullCustomer)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toBeDefined()
    expect(customer.getBillingAddress()).toEqual(fullCustomer.getBillingAddress())
    expect(customer.getShippingAddress()).toEqual(fullCustomer.getShippingAddress())
    expect(customer.getCompanyInfo()).toEqual(fullCustomer.getCompanyInfo())
  })
})
