import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import SepaDirectDebitGGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'

describe('Payment Type SepaDirectDebitGGuaranteed Test', () => {
  let heidelpay: Heidelpay

  const getSSD = () => {
    return new SepaDirectDebitGGuaranteed("DE89370400440532013000")
    .setBic("COBADEFFXXX")
    .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create SepaDirectDebitGGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGGuaranteed

    expect(ssd.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebitGGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGGuaranteed = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitGGuaranteed
    const fetchSepaDirectDebitGGuaranteed: SepaDirectDebitGGuaranteed = await heidelpay.fetchPaymentType(ssd.getId()) as SepaDirectDebitGGuaranteed

    expect(fetchSepaDirectDebitGGuaranteed.getId()).toEqual(ssd.getId())
  })
})
