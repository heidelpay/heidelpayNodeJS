import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import SepaDirectDebit from '../../../src/payments/types/SepaDirectDebit'

describe('Payment Type SepaDirectDebit Test', () => {
  let heidelpay: Heidelpay

  const getSepaDirectDebitConstructor = () => {
    return new SepaDirectDebit("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  const getSepaDirectDebit = () => {
    return new SepaDirectDebit()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create SepaDirectDebit payment type', async () => {
    const sepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(getSepaDirectDebitConstructor()) as SepaDirectDebit

    expect(sepaDirectDebit.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebit payment type', async () => {
    const sepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit
    const fetchSepaDirectDebit: SepaDirectDebit = await heidelpay.fetchPaymentType(sepaDirectDebit.getId()) as SepaDirectDebit

    expect(fetchSepaDirectDebit.getId()).toEqual(sepaDirectDebit.getId())
  })

  it('Test geoLocation', async () => {
    const sepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit
    const fetchSepaDirectDebit: SepaDirectDebit = await heidelpay.fetchPaymentType(sepaDirectDebit.getId()) as SepaDirectDebit

    expect(sepaDirectDebit.getGeoLocation()).toBeDefined()
    expect(fetchSepaDirectDebit.getGeoLocation()).toBeDefined()
  })
})
