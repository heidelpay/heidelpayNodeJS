import fetchMock from 'fetch-mock'
import Heidelpay from '../src'
import { Card, CardBuilder, PaymentCard } from '../src/payments/card'
import { CustomerBuilder, Customer, Salutation, Address } from '../src/business/Customer'

describe('Initial test', () => {
  let heidelpay

  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/cards', {
      id: 's-crd-llany1bnku9e'
    })

    fetchMock.post('end:/customers', {
      id: 's-cst-27001cb455ba'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })

  it('Test create payment card with a card', async () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4711100000000000')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    const paymentCard: PaymentCard = await heidelpay.createPaymentType(card)

    expect(paymentCard).toBeInstanceOf(PaymentCard)
    expect(paymentCard.getId()).toEqual('s-crd-llany1bnku9e')
  })

  it('Test Heidelpay class create Customer', async () => {
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

    const newCustomer: Customer = await heidelpay.createCustomer(customer)
    expect(newCustomer).toBeInstanceOf(Customer)
    expect(newCustomer.getCustomerId()).toEqual('s-cst-27001cb455ba')
  })
})
