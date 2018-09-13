import fetchMock from 'fetch-mock'
import Heidelpay from '../../../src/Heidelpay'
import Sofort from '../../../src/payments/types/Sofort'

describe('Payment Type Sofort Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/sofort', {
      id: 's-sft-llany1bnku9e'
    })

    fetchMock.get('end:/types/sofort/s-sft-llany1bnku9e', {
      id: 's-sft-llany1bnku9e',
      method: 'sofort'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Sofort payment type', async () => {
    let sofort: Sofort = new Sofort()

    const paymentSofort: Sofort = await heidelpay.createPaymentType(sofort)

    expect(paymentSofort.getId()).toEqual('s-sft-llany1bnku9e')
  })

  it('Test Fetch Sofort payment', async () => {
    let sofort: Sofort = new Sofort()

    const paymentSofort: Sofort = await heidelpay.createPaymentType(sofort)
    const fetchedSofort: Sofort = await heidelpay.fetchPaymentType(paymentSofort.getId())

    expect(fetchedSofort.getId()).toEqual(paymentSofort.getId())
  })
})
