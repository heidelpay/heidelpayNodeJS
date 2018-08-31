import Heidelpay from '../src'

const heidelpay = new Heidelpay('s-pri-xxx')

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

  it('Heidelpay get new instance in twice', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })
})
