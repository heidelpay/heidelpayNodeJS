import Heidelpay from '../src'

describe('Initial test', () => {
  it('Heidelpay is instantiable', () => {
    expect(Heidelpay.getInstance()).toBeInstanceOf(Heidelpay)
  })

  it('Heidelpay get new instance in twice', () => {
    expect(Heidelpay.getInstance()).toBeInstanceOf(Heidelpay)
    expect(Heidelpay.getInstance()).toBeInstanceOf(Heidelpay)
  })
})
