import fetchMock from 'fetch-mock'
import Heidelpay from '../../src/Heidelpay'
import { Authorization } from '../../src/payments'
import { CardBuilder, Card } from '../../src/payments/card'
import { CustomerBuilder, Customer, Salutation, Address } from '../../src/business/Customer'
import { authorizeObject } from '../../src/business/Authorization'

describe('Authorize test', () => {
  let heidelpay

  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/cards', {
      id: 's-crd-llany1bnku9e'
    })

    fetchMock.post('end:/customers', {
      id: 's-cst-27001cb455ba'
    })

    fetchMock.get('end:/customers/s-cst-27001cb455ba', {
      id: 's-cst-27001cb455ba',
      lastname: 'Doe',
      firstname: 'John',
      salutation: 'mr',
      company: 'heidelpay GmbH',
      customerId: '7694',
      birthDate: '1964-12-29',
      email: 'John.Doe@heidelpay.com',
      phone: '+4962216471100',
      mobile: '+49172123456',
      address: {
        name: 'Peter Universum',
        street: 'Hugo-Junkers-Str. 5',
        state: 'DE-BO',
        zip: '60386',
        city: 'Frankfurt am Main',
        country: 'DE'
      }
    })

    fetchMock.post('end:/payments/authorize', {
      id: 's-aut-1',
      resources: {
        customerId: 's-cst-27001cb455ba',
        paymentId: 's-pay-3195',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-egvhe5zs1imk'
      }
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test authorize with typeId', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
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
      typeId: card,
      returnUrl: 'https://www.google.at'
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
      customerId: customer,
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with customer Id', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      customerId: 's-cst-27001cb455ba',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with return URL', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with customer and return URL', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
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
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    expect(authorize.getId()).toEqual('s-aut-1')
  })

  it('Test authorize with fetch customer', async () => {
    const authorizePayload: authorizeObject = {
      amount: 5,
      currency: 'EUR',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-rcgriiqelkum',
      returnUrl: 'https://www.google.at'
    }

    const authorize: Authorization = await heidelpay.authorize(authorizePayload)
    const customer: Customer = await authorize.getResources().fetchCustomer()

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toEqual('s-cst-27001cb455ba')
    expect(authorize.getId()).toEqual('s-aut-1')
  })
})
