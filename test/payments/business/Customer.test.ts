import { Customer, Salutation, Address } from '../../../src/payments/Customer'
import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'

describe('Customer test', () => {
  let heidelpay: Heidelpay
  const {createMiniumCustomer, createFullCustomer} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test create minium customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createMiniumCustomer())
    
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getFirstName()).toEqual(createMiniumCustomer().getFirstName())
    expect(customer.getLastName()).toEqual(createMiniumCustomer().getLastName())
  })

  it('Test create full customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createFullCustomer())
    
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toBeDefined()
  })

  it('Test fetch minium customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createMiniumCustomer())
    const fetchCustomer: Customer = await heidelpay.fetchCustomer(customer.getCustomerId())
    
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toEqual(fetchCustomer.getCustomerId())
  })

  it('Test fetch full customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createFullCustomer())
    const fetchCustomer: Customer = await heidelpay.fetchCustomer(customer.getCustomerId())
    
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toEqual(fetchCustomer.getCustomerId())
  })
})
