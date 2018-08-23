/*
 * @Author: Minh Tri Nguyen 
 * @Date: 2018-08-23 15:35:54 
 * @Last Modified by: Minh Tri Nguyen
 * @Last Modified time: 2018-08-23 16:34:13
 */
import { CustomerBuilder, Customer } from '../../src/entities/Customer'
import Heidelpay from '../../src/Heidelpay'

describe('Customer test', () => {
  it('Test create Customer Builder', () => {
    const customer: Customer = new CustomerBuilder().create()

    expect(customer).toBeInstanceOf(Customer)
  })

  it('Test set firstName and lastName into customer builder', () => {
    const customer: Customer = new CustomerBuilder()
      .setFirstName('Minh Tri')
      .setLastName('Nguyen')
      .create()

    expect(customer.firstName).toEqual('Minh Tri')
    expect(customer.lastName).toEqual('Nguyen')
  })

  it('Test Heidelpay class create Customer', () => {
    const heidelpay = Heidelpay.getInstance()

    const customer: Customer = new CustomerBuilder()
      .setFirstName('Minh Tri')
      .setLastName('Nguyen')
      .create()

    const newCustomer = heidelpay.createCustomer(customer)
    expect(newCustomer).toBeInstanceOf(Customer)
  })
})
