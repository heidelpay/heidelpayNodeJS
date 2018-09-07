/**
 * Resources class
 *
 * @export
 * @class Resources
 */
export default class Resources {
  private typeId: string
  private customerId: string
  private metadataId: string
  private paymentId: string
  private riskId: string

  constructor() {
    this.typeId = ''
    this.customerId = ''
    this.metadataId = ''
    this.paymentId = ''
    this.riskId = ''
  }

  public getTypeId() {
    return this.typeId
  }

  public setTypeId(typeId: string) {
    this.typeId = typeId
    return this
  }

  public getCustomerId(): string {
    return this.customerId
  }

  public setCustomerId(customerId: string): Resources {
    this.customerId = customerId
    return this
  }

  public getMetadataId(): string {
    return this.metadataId
  }

  public setMetadataId(metadataId: string): Resources {
    this.metadataId = metadataId
    return this
  }

  public getPaymentId(): string {
    return this.paymentId
  }

  public setPaymentId(paymentId: string): Resources {
    this.paymentId = paymentId
    return this
  }

  public getRiskId(): string {
    return this.riskId
  }

  public setRiskId(riskId: string): Resources {
    this.riskId = riskId
    return this
  }
}
