import { Customer, Salutation, Address } from '../../../src/payments/Customer'
import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'

describe('Customer test', () => {
  let heidelpay: Heidelpay
  const { createMiniumCustomer, createFullCustomer } = TestHelper

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

  it('Test update customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createFullCustomer())

    const updateDataCustomer = new Customer(customer.getFirstName(), customer.getLastName())
    updateDataCustomer.setFirstName("Max")

    const updatedCustomer = await heidelpay.updateCustomer(customer.getCustomerId(), updateDataCustomer)
    const fetchCustomer: Customer = await heidelpay.fetchCustomer(customer.getCustomerId())
    expect(updatedCustomer.getFirstName()).toEqual(fetchCustomer.getFirstName())
  })

  it('Test delete customer', async () => {
    const customer: Customer = await heidelpay.createCustomer(createFullCustomer())
    const deleteCustomer = await heidelpay.deleteCustomer(customer.getCustomerId())

    expect(deleteCustomer).toBeTruthy()
  })
})
