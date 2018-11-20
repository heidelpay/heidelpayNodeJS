import Heidelpay from '../../src/Heidelpay'
import * as ErrorMessage from '../../src/configs/ErrorMessage'
import * as TestHelper from '../helpers/TestHelper'
import Card from '../../src/payments/types/Card';
import Authorization from '../../src/payments/business/Authorization';
import Cancel from '../../src/payments/business/Cancel';

describe('Payment Type Card Test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const { getAuthorization, getCancelAuthorization, getCancelCharge, getCharge } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test cancel authorization error', async () => {
    try {
      const card: Card = await createPaymentTypeCard()
      const authorization: Authorization = await heidelpay.authorize(getAuthorization(card.getId()))

      const cancelAuthorize: Cancel = await authorization.cancel(500)
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("API.340.100.017")
      expect(errorMessage[0].merchantMessage).toEqual("The amount of 500 to be reversed exceeds the authorized amount of 100")
    }
  })
})
