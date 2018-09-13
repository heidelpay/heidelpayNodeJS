import fetchMock from 'fetch-mock'
import SepaDirectDebit from '../../../src/payments/types/SepaDirectDebit'
import Heidelpay from '../../../src/Heidelpay'

describe('Payment Type Sepa Direct Debit Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/sepa-direct-debit', {
      id: 's-sdd-llany1bnku9e'
    })

    fetchMock.get('end:/types/sepa-direct-debit/s-sdd-llany1bnku9e', {
      id: 's-sdd-llany1bnku9e',
      method: 'sepa-direct-debit',
      iban: 'DE89370400440532013000',
      bic: 'COBADEFFXXX',
      holder: 'Rene Felder'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Sepa Direct Debit payment type', async () => {
    let sepaDirectDebit: SepaDirectDebit = new SepaDirectDebit()
    sepaDirectDebit
      .setIban('DE89370400440532013000')
      .setBic('COBADEFFXXX')
      .setHolder('Rene Felder')

    const paymentSepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(
      sepaDirectDebit
    )

    expect(paymentSepaDirectDebit.getId()).toEqual('s-sdd-llany1bnku9e')
  })

  it('Test Fetch Sepa Direct Debit payment', async () => {
    let sepaDirectDebit: SepaDirectDebit = new SepaDirectDebit()
    sepaDirectDebit
      .setIban('DE89370400440532013000')
      .setBic('COBADEFFXXX')
      .setHolder('Rene Felder')

    const paymentSepaDirectDebit: SepaDirectDebit = await heidelpay.createPaymentType(
      sepaDirectDebit
    )
    const fetchedSepaDirectDebit: SepaDirectDebit = await heidelpay.fetchPaymentType(
      paymentSepaDirectDebit.getId()
    )

    expect(fetchedSepaDirectDebit.getId()).toEqual('s-sdd-llany1bnku9e')
    expect(fetchedSepaDirectDebit.getBic()).toEqual(paymentSepaDirectDebit.getBic())
    expect(fetchedSepaDirectDebit.getIban()).toEqual(paymentSepaDirectDebit.getIban())
    expect(fetchedSepaDirectDebit.getHolder()).toEqual(paymentSepaDirectDebit.getHolder())
  })
})
