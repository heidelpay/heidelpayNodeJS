import { Card, CardBuilder } from '../../../src/payments/card'
import PaymentType from '../../../src/payments/PaymentType'
import Heidelpay from '../../../src/Heidelpay'

describe('Payment Type Card Test', () => {
  let heidelpay
  beforeEach(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test create Card Builder', () => {
    const card: Card = new CardBuilder().create()

    expect(card).toBeInstanceOf(Card)
  })

  it('Test create payment by card payment type', () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4242')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    const paymentType: PaymentType = heidelpay.createPaymentType(card)
  })
})
