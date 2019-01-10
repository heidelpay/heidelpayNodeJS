import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import EPS from '../../../src/payments/types/Eps'

describe('Payment Type Eps Test', () => {
  let heidelpay: Heidelpay

  const getEps = () => {
    return new EPS()
  }

  const getEpsWithBic = () => {
    const eps = new EPS()
    eps.setBic("TESTDETT421")

    return eps
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Eps payment type', async () => {
    const eps: EPS = await heidelpay.createPaymentType(getEps()) as EPS

    expect(eps.getId()).toBeDefined()
    expect(eps.getPayload()).toBeDefined()
  })

  it('Test Create Eps payment type with bic', async () => {
    const eps: EPS = await heidelpay.createPaymentType(getEpsWithBic()) as EPS

    expect(eps.getId()).toBeDefined()
    expect(eps.getPayload()).toBeDefined()
  })

  it('Test Fetch Eps payment type', async () => {
    const eps: EPS = await heidelpay.createPaymentType(getEps()) as EPS
    const fetchEps: EPS = await heidelpay.fetchPaymentType(eps.getId()) as EPS

    expect(fetchEps.getId()).toEqual(eps.getId())
  })
})
