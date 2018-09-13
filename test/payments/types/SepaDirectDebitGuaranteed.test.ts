import fetchMock from 'fetch-mock'
import SepaDirectDebitGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'
import Heidelpay from '../../../src/Heidelpay'

describe('Payment Type Sepa Direct Debit Guaranteed Test', () => {
  let heidelpay
  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.post('end:/types/sepa-direct-debit-guaranteed', {
      id: 's-ddg-llany1bnku9e'
    })

    fetchMock.get('end:/types/sepa-direct-debit-guaranteed/s-ddg-llany1bnku9e', {
      id: 's-ddg-llany1bnku9e',
      method: 'sepa-direct-debit-guaranteed',
      iban: 'DE89370400440532013000'
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('Test Create Sepa Direct Debit Guaranteed payment type', async () => {
    let ddg: SepaDirectDebitGuaranteed = new SepaDirectDebitGuaranteed()
    ddg.setIban('DE89370400440532013000')

    const paymentDdg: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(ddg)

    expect(paymentDdg.getId()).toEqual('s-ddg-llany1bnku9e')
  })

  it('Test Fetch Sepa Direct Debit Guaranteed payment', async () => {
    let ddg: SepaDirectDebitGuaranteed = new SepaDirectDebitGuaranteed()
    ddg.setIban('DE89370400440532013000')

    const paymentDdg: SepaDirectDebitGuaranteed = await heidelpay.createPaymentType(ddg)
    const fetchedPaymentDdg: SepaDirectDebitGuaranteed = await heidelpay.fetchPaymentType(
      paymentDdg.getId()
    )

    expect(fetchedPaymentDdg.getId()).toEqual('s-ddg-llany1bnku9e')
    expect(fetchedPaymentDdg.getIban()).toEqual(paymentDdg.getIban())
  })
})
