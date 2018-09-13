import AbstractPayment from '../../payments/business/AbstractPayment'

export default (instance: AbstractPayment, resources: any): AbstractPayment => {
  instance
    .getResources()
    .setCustomerId(resources.customerId)
    .setMetadataId(resources.metadataId)
    .setPaymentId(resources.paymentId)
    .setTypeId(resources.typeId)
    .setRiskId(resources.riskId)

  return instance
}
