import Heidelpay from '../../src/Heidelpay'
import * as ErrorMessage from '../../src/configs/ErrorMessage'
import * as TestHelper from '../helpers/TestHelper'
import Card from '../../src/payments/types/Card';

describe('Payment Type Card Test', () => {
  let heidelpay: Heidelpay
  const { getAuthorization, getCancelAuthorization, getCancelCharge, getCharge } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test missing key heidelpay', async () => {
    try {
      const errorHeidelpay = new Heidelpay(null)
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test authorize invalid key heidelpay', async () => {
    try {
      const errorHeidelpay = new Heidelpay('6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
      await errorHeidelpay.authorize(getAuthorization(""))
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test charge with empty value', async () => {
    try {
      await heidelpay.charge(getCharge(""))
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test charge authorize with empty value', async () => {
    try {
      await heidelpay.chargeAuthorization(TestHelper.getChargeAuthorization(""))
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test cancel authorize with empty value', async () => {
    try {
      await heidelpay.cancelAuthorization(getCancelAuthorization("", "", 50))
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test cancel charge with empty value', async () => {
    try {
      await heidelpay.cancelCharge(getCancelCharge("", ""))
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test create payment type with empty value', async () => {
    try {
      const card: Card = new Card()
      await heidelpay.createPaymentType(card)
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test fetch payment with empty value', async () => {
    try {
      await heidelpay.fetchPayment("")
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })


  it('Test fetch cancel with empty value', async () => {
    try {
      await heidelpay.fetchCancel("", "", "")
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })
})
