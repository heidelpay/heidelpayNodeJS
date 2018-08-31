import { Card, CardBuilder } from '../../../src/payments/card/Card'
import PaymentType from '../../../src/payments/PaymentType'
import Heidelpay from '../../../src/Heidelpay'

describe('Payment Type Card Test', () => {
  let heidelpay
  beforeEach(() => {
    heidelpay = new Heidelpay('private-key')
  })

  it('Test create Card Builder', () => {
    const card: Card = new CardBuilder().create()

    expect(card).toBeInstanceOf(Card)
  })

  it('Test set property in card builder', () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4242')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    expect(card.getPanNumber()).toEqual('4242')
    expect(card.getCVC()).toEqual('123')
    expect(card.getExpiryDate()).toEqual('01/22')
  })

  it('Test create payment by card payment type', () => {
    const card: Card = new CardBuilder()
      .setPanNumber('4242')
      .setCVC('123')
      .setExpiryDate('01/22')
      .create()

    const paymentType: PaymentType = heidelpay.createPayment(Card)
  })
})
