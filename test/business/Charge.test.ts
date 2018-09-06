import fetchMock from 'fetch-mock'
import Heidelpay from '../../src/Heidelpay'
import Charge, { chargeObject } from '../../src/business/Charge'
import { CardBuilder, Card } from '../../src/payments/card'
import { Address, Customer, CustomerBuilder, Salutation } from '../../src/business/Customer'

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

    fetchMock.post('end:/payments/charges', {
      id: 's-chg-1'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test charge with typeId', async () => {
    const chargePayload: chargeObject = {
      amount: 5,
      currency: 'EUR',
      returnUrl: 'https://www.google.at',
      customerId: 's-cst-27001cb455ba',
      typeId: 's-crd-q3ffv1eyo252'
    }
    const charge: Charge = await heidelpay.charge(chargePayload)
    expect(charge.getId()).toEqual('s-chg-1')
  })

  it('Test charge with payment type', async () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4711100000000000')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    const chargePayload: chargeObject = {
      amount: 5,
      currency: 'EUR',
      returnUrl: 'https://www.google.at',
      customerId: 's-cst-27001cb455ba',
      typeId: card
    }
    const charge: Charge = await heidelpay.charge(chargePayload)
    expect(charge.getId()).toEqual('s-chg-1')
  })

  it('Test charge with customer', async () => {
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

    const chargePayload: chargeObject = {
      amount: 5,
      currency: 'EUR',
      returnUrl: 'https://www.google.at',
      customerId: customer,
      typeId: 's-crd-q3ffv1eyo252'
    }
    const charge: Charge = await heidelpay.charge(chargePayload)
    expect(charge.getId()).toEqual('s-chg-1')
  })
})
