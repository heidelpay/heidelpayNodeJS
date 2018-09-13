import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Ideal from '../../../src/payments/types/Ideal'

describe('Payment Type Ideal Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/ideal', {
      id: 's-idl-llany1bnku9e'
    })

    fetchMock.get('end:/types/ideal/s-idl-llany1bnku9e', {
      id: 's-idl-llany1bnku9e',
      method: 'ideal',
      bankName: 'RABONL2U'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Ideal payment type', async () => {
    let ideal: Ideal = new Ideal()
    ideal.setBankName('RABONL2U')

    const paymentIdeal: Ideal = await heidelpay.createPaymentType(ideal)

    expect(paymentIdeal.getId()).toEqual('s-idl-llany1bnku9e')
  })

  it('Test Fetch Ideal payment', async () => {
    let ideal: Ideal = new Ideal()
    ideal.setBankName('RABONL2U')

    const paymentIdeal: Ideal = await heidelpay.createPaymentType(ideal)
    const fetchedIdeal: Ideal = await heidelpay.fetchPaymentType(paymentIdeal.getId())

    expect(fetchedIdeal.getId()).toEqual('s-idl-llany1bnku9e')
    expect(fetchedIdeal.getBankName()).toEqual(paymentIdeal.getBankName())
  })
})
