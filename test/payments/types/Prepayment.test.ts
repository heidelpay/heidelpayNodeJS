import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Prepayment from '../../../src/payments/types/Prepayment'

describe('Payment Type Prepayment Test', () => {
  let heidelpay: Heidelpay

  const getPrepayment = () => {
    return new Prepayment()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create Prepayment payment type', async () => {
    const prepayment: Prepayment = await heidelpay.createPaymentType(getPrepayment()) as Prepayment

    expect(prepayment.getId()).toBeDefined()
  })

  it('Test Fetch Prepayment payment type', async () => {
    const prepayment: Prepayment = await heidelpay.createPaymentType(getPrepayment()) as Prepayment
    const fetchPrepayment: Prepayment = await heidelpay.fetchPaymentType(prepayment.getId()) as Prepayment

    expect(fetchPrepayment.getId()).toEqual(prepayment.getId())
  })
})
