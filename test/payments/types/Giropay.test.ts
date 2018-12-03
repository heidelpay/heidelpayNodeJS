import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Giropay from '../../../src/payments/types/Giropay'

describe('Payment Type Giropay Test', () => {
  let heidelpay: Heidelpay

  const getGiropay = () => {
    return new Giropay()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Giropay payment type', async () => {
    const giropay: Giropay = await heidelpay.createPaymentType(getGiropay()) as Giropay

    expect(giropay.getId()).toBeDefined()
  })

  it('Test Fetch Giropay payment type', async () => {
    const giropay: Giropay = await heidelpay.createPaymentType(getGiropay()) as Giropay
    const fetchGiropay: Giropay = await heidelpay.fetchPaymentType(giropay.getId()) as Giropay

    expect(fetchGiropay.getId()).toEqual(giropay.getId())
  })
})
