import fetchMock from 'fetch-mock'
import Heidelpay from '../../src/Heidelpay'
import Payment from '../../src/payments/business/Payment'
import TransactionItem from '../../src/payments/TransactionItem'

describe('Payment Test', () => {
  let heidelpay

  beforeAll(() => {
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
    fetchMock.get('end:/payments/s-pay-3645', {
      id: 's-pay-3645',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      },
      transactions: [
        {
          date: '2018-09-10 03:53:51',
          type: 'authorize',
          url: 'https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1',
          amount: '100.0000'
        }
      ]
    })

    fetchMock.get('end:/payments/s-pay-3645/authorize/s-aut-1', {
      id: 's-aut-1',
      isSuccess: true,
      isPending: false,
      type: 'authorize',
      amount: '100.0000',
      currency: 'EUR',
      date: '2018-09-10 03:53:51',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      },
      processing: {
        uniqueId: '31HA07BC813A512FAD1A2625032607C3',
        shortId: '4004.7803.1664'
      }
    })
  })

  it('Heidelpay is instantiable', () => {
    expect(heidelpay).toBeInstanceOf(Heidelpay)
  })

  it('Fetch a payment', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')
    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
  })

  it('Fetch a payment and get resources', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getResources().getPaymentId()).toEqual('s-pay-3645')
  })

  it('Fetch a payment and get list transactions', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')
    const listTransactions = []
    const transactionItem = new TransactionItem(heidelpay)

    transactionItem
      .setDate('2018-09-10 03:53:51')
      .setAmount('100.0000')
      .setType('authorize')
      .setUrl('https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1')

    listTransactions.push(transactionItem)

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getTransactions().getList()).toEqual(listTransactions)
  })

  it('Fetch a payment and get detail transactions', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')
    const listTransactions = []
    const transactionItem = new TransactionItem(heidelpay)

    transactionItem
      .setDate('2018-09-10 03:53:51')
      .setAmount('100.0000')
      .setType('authorize')
      .setUrl('https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1')

    listTransactions.push(transactionItem)

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getTransactions().getList()).toEqual(listTransactions)
    expect(payment.getTransactions().fetchTransactionItem(0)).toBeDefined()
  })
})
