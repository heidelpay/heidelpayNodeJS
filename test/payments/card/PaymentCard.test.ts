import Heidelpay from '../../../src/Heidelpay'
import { CardBuilder, Card, PaymentCard } from '../../../src/payments/card'
import PaymentType from '../../../src/payments/PaymentType'

describe('Payment Card Test', () => {
  let heidelpay
  beforeEach(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })
})
