import fetchMock from 'fetch-mock'
import Heidelpay from '../../src/Heidelpay'
import Payment from '../../src/payments/business/Payment'
import Charge from '../../src/payments/business/Charge'
import Cancel from '../../src/payments/business/Cancel'

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
        },
        {
          date: '2018-09-10 03:53:51',
          type: 'charge',
          url:
            'https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1/charges/s-chg-1',
          amount: '30.0000'
        },
        {
          date: '2018-09-10 03:53:51',
          type: 'charge',
          url:
            'https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1/charges/s-chg-2',
          amount: '50.0000'
        },
        {
          date: '2018-09-10 03:53:51',
          type: 'cancel',
          url:
            'https://dev-api.heidelpay.com/v1/payments/s-pay-3645/authorize/s-aut-1/cancels/s-cnl-1',
          amount: '30.0000'
        },
        {
          date: '2018-09-10 03:53:51',
          type: 'cancel-charge',
          url:
            'https://dev-api.heidelpay.com/v1/payments/s-pay-3645/charges/s-chg-1/cancels/s-cnl-1',
          amount: '30.0000'
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

    fetchMock.get('end:/payments/s-pay-3645/authorize/s-aut-1/charges/s-chg-1', {
      id: 's-chg-1',
      isSuccess: true,
      isPending: false,
      type: 'charge',
      amount: '30.0000',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      }
    })

    fetchMock.get('end:/payments/s-pay-3645/authorize/s-aut-1/charges/s-chg-2', {
      id: 's-chg-2',
      amount: '50.0000',
      type: 'charge',
      currency: 'EUR',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      }
    })

    fetchMock.post('end:/payments/s-pay-3645/authorize/s-aut-1/cancels', {
      id: 's-cnl-1',
      amount: '50.0000',
      type: 'cancel',
      currency: 'EUR',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      }
    })

    fetchMock.post('end:/payments/s-pay-3645/charges/s-chg-1/cancels', {
      id: 's-cnl-1',
      amount: '50.0000',
      type: 'cancel',
      currency: 'EUR',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      }
    })

    fetchMock.get('end:/payments/s-pay-3645/authorize/s-aut-1/cancels/s-cnl-1', {
      id: 's-cnl-1',
      amount: '50.0000',
      type: 'cancel',
      currency: 'EUR',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
      }
    })

    fetchMock.get('end:/payments/s-pay-3645/charges/s-chg-1/cancels/s-cnl-1', {
      id: 's-cnl-1',
      amount: '50.0000',
      type: 'cancel',
      currency: 'EUR',
      resources: {
        customerId: '',
        paymentId: 's-pay-3645',
        basketId: '',
        riskId: '',
        metadataId: '',
        typeId: 's-crd-qvk4snmq3evq'
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

  it('Fetch a payment and get authorize', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getAuthorization().getId()).toEqual('s-aut-1')
  })

  it('Fetch a payment and get authorize and cancel', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')
    const cancel: Cancel = await payment.getAuthorization().cancel()

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(cancel.getId()).toEqual('s-cnl-1')
  })

  it('Fetch a payment and get list charges', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getChargeList().length).toEqual(2)
  })

  it('Fetch a payment and get charge Item', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getCharge('s-chg-1')).toBeInstanceOf(Charge)
  })

  it('Fetch a payment and get cancel', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')
    const cancel: Cancel = payment.getCancel('s-cnl-1')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(cancel.getId()).toEqual('s-cnl-1')
  })

  it('Fetch a payment and get cancel item and with refund Id', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')
    const cancel: Cancel = payment.getCancel('s-cnl-1', 's-chg-1')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(cancel.getId()).toEqual('s-cnl-1')
  })

  it('Fetch a payment and get list cancels', async () => {
    const payment: Payment = await heidelpay.fetchPayment('s-pay-3645')

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.getId()).toEqual('s-pay-3645')
    expect(payment.getCancelList().length).toEqual(2)
  })
})
