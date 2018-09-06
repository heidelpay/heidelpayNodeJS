import Heidelpay from '../../src/Heidelpay'
import Payment from '../../src/payments/Payment'
import Authorization from '../../src/business/Authorization'
import Charge from '../../src/business/Charge'

describe('Payment Test', () => {
  let heidelpay
  let payment
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    payment = new Payment(heidelpay)
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })

  it('Payment is instantiable', () => {
    expect(payment).toBeInstanceOf(Payment)
  })
})
