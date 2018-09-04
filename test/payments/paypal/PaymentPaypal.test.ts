import Heidelpay from '../../../src/Heidelpay'

describe('Payment Paypal Test', () => {
  let heidelpay
  beforeEach(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })
})
