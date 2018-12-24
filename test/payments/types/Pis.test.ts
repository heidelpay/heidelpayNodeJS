import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Pis from '../../../src/payments/types/Pis'

describe('Payment Type PIS Test', () => {
  let heidelpay: Heidelpay

  const getPis = () => {
    return new Pis()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create PIS payment type', async () => {
    const pis: Pis = await heidelpay.createPaymentType(getPis()) as Pis

    expect(pis.getId()).toBeDefined()
  })

  it('Test Fetch PIS payment type', async () => {
    const pis: Pis = await heidelpay.createPaymentType(getPis()) as Pis
    const fetchPis: Pis = await heidelpay.fetchPaymentType(pis.getId()) as Pis

    expect(fetchPis.getId()).toEqual(pis.getId())
  })
})
