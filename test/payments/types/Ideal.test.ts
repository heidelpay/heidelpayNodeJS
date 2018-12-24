import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Ideal from '../../../src/payments/types/Ideal'

describe('Payment Type Ideal Test', () => {
  let heidelpay: Heidelpay

  const getIdeal = () => {
    return new Ideal().setBic("RABONL2U")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Ideal payment type', async () => {
    const ideal: Ideal = await heidelpay.createPaymentType(getIdeal()) as Ideal

    expect(ideal.getId()).toBeDefined()
  })

  it('Test Fetch Ideal payment type', async () => {
    const ideal: Ideal = await heidelpay.createPaymentType(getIdeal()) as Ideal
    const fetchIdeal: Ideal = await heidelpay.fetchPaymentType(ideal.getId()) as Ideal

    expect(fetchIdeal.getId()).toEqual(ideal.getId())
  })
})
