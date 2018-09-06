import fetchMock from 'fetch-mock'
import Heidelpay from '../../src/Heidelpay'
import { Authorization } from '../../src/payments'
import { CardBuilder, Card } from '../../src/payments/card'
import { CustomerBuilder, Customer, Salutation, Address } from '../../src/business/Customer'
import { authorizeObject } from '../../src/business/Authorization'

describe('Customer test', () => {
  let heidelpay

  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/cards', {
      id: 's-crd-llany1bnku9e'
    })

    fetchMock.post('end:/customers', {
      id: 's-cst-27001cb455ba'
    })

    fetchMock.post('end:/payments/authorize', {
      id: 's-aut-1'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test authorize with typeId', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with payment type Card', async () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4711100000000000')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: card
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with customer', async () => {
    const address: Address = {
      name: 'Peter Universum',
      street: 'Hugo-Junkers-Str. 5',
      state: 'DE-BO',
      zip: '60386',
      city: 'Frankfurt am Main',
      country: 'DE'
    }

    const customerBuilder: Customer = new CustomerBuilder()
      .setFirstName('John')
      .setLastName('Doe')
      .setSalutation(Salutation.mr)
      .setBirthDate('1972-12-24')
      .setEmail('John.Doe@heidelpay.com')
      .setPhone('+49 6221 64 71 100')
      .setMobile('+49 172 123 456')
      .setAddress(address)
      .create()

    const customer: Customer = await heidelpay.createCustomer(customerBuilder)
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      customerId: customer
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with customer Id', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      customerId: 's-cst-27001cb455ba'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with return URL', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnURL: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with customer and return URL', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnURL: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with customer Id and return URL', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-rcgriiqelkum',
      returnURL: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })
})
