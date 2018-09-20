import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import SepaDirectDebit from '../../../src/payments/types/SepaDirectDebit'

describe('Payment Type SepaDirectDebit Test', () => {
  let heidelpay: Heidelpay

  const getSepaDirectDebit = () => {
    return new SepaDirectDebit("DE89370400440532013000")
    .setBic("COBADEFFXXX")
    .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create SepaDirectDebit payment type', async () => {
    const sepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit

    expect(sepaDirectDebit.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebit payment type', async () => {
    const sepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit
    const fetchSepaDirectDebit: SepaDirectDebit = await heidelpay.fetchPaymentType(sepaDirectDebit.getId()) as SepaDirectDebit

    expect(fetchSepaDirectDebit.getId()).toEqual(sepaDirectDebit.getId())
  })
})
