import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import SepaDirectDebitGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'

describe('Payment Type SepaDirectDebitGuaranteed Test', () => {
  let heidelpay: Heidelpay

  const getSSD = () => {
    return new SepaDirectDebitGuaranteed("DE89370400440532013000")
    .setBic("COBADEFFXXX")
    .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create SepaDirectDebitGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed

    expect(ssd.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebitGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed
    const fetchSepaDirectDebitGuaranteed: SepaDirectDebitGuaranteed = await heidelpay.fetchPaymentType(ssd.getId()) as SepaDirectDebitGuaranteed

    expect(fetchSepaDirectDebitGuaranteed.getId()).toEqual(ssd.getId())
  })
})
