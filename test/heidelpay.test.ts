import Heidelpay from '../src'

describe('Initial test', () => {
  let heidelpay
  beforeEach(() => {
    heidelpay = new Heidelpay('private-key')
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })

  it('Heidelpay test authorize', () => {
    const authorize = heidelpay.authorize()
  })
})
