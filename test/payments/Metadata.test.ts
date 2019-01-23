import Metadata from '../../src/payments/Metadata'
import Heidelpay from '../../src/Heidelpay'
import Charge from '../../src/payments/business/Charge'
import Authorization from '../../src/payments/business/Authorization'
import * as TestHelper from '../helpers/TestHelper'

describe('Metadata test', () => {
  let heidelpay: Heidelpay
  let createPaymentTypeCard
  const {createMetadataValue, getChargeWithMetadataId, getAuthorizationWithMetadataId} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(heidelpay)
  })

  it('Test create metadata', async () => {
    const metadata: Metadata = await heidelpay.createMetadata(createMetadataValue())

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
  })
  
  it('Test create and fetch metadata', async () => {
    const metadataValue = createMetadataValue()
    const metadata: Metadata = await heidelpay.createMetadata(metadataValue)

    const fetchedMetadata: Metadata = await heidelpay.fetchMetadata(metadata.getId())

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
    expect(fetchedMetadata.getValue()).toEqual(metadataValue.getValue())
  })

  it('Test create metadata and charge', async () => {
    const metadataValue = createMetadataValue()
    const metadata: Metadata = await heidelpay.createMetadata(metadataValue)

    const card = await createPaymentTypeCard()
    const charge: Charge = await heidelpay.charge(getChargeWithMetadataId(card.getId(), metadata.getId()))

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getResources().getMetadataId()).toEqual(metadata.getId())
  })

  it('Test create metadata and authorize', async () => {
    const metadataValue = createMetadataValue()
    const metadata: Metadata = await heidelpay.createMetadata(metadataValue)

    const card = await createPaymentTypeCard()
    const authorize: Authorization = await heidelpay.authorize(getAuthorizationWithMetadataId(card.getId(), metadata.getId()))

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getResources().getMetadataId()).toEqual(metadata.getId())
  })
})