import Heidelpay from '../../src/Heidelpay'
import { Authorization } from '../../src/payments'
import { CardBuilder, Card } from '../../src/payments/card'
import { CustomerBuilder, Customer, Salutation, Address } from '../../src/business/Customer'

describe('Customer test', () => {
  let heidelpay

  beforeEach(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test authorize with typeId', async () => {
    const authorize: Authorization = await heidelpay.authorize(5, 'EUR', 's-crd-rcgriiqelkum')
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).not.toBeUndefined()
  })

  it('Test authorize with payment type Card', async () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4711100000000000')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    const authorize: Authorization = await heidelpay.authorize(5, 'EUR', card)
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).not.toBeUndefined()
  })

  it('Test authorize with payment type Card', async () => {
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
    const authorize: Authorization = await heidelpay.authorize(
      5,
      'EUR',
      's-crd-rcgriiqelkum',
      customer
    )
  })
})
