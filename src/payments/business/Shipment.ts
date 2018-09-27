import AbstractPayment from "./AbstractPayment";
import Resources from "./Resources";
import Heidelpay from "../../Heidelpay";
import Processing from "./Processing";

export default class Shipment extends AbstractPayment {
  private amount: string
  private resources: Resources
  private processing: Processing

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
    this.processing = new Processing()
  }

  /**
   * Get Amount
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this.amount
  }

  /**
   * Set Amount
   *
   * @param {string} amount
   */
  public setAmount(amount: string) {
    this.amount = amount
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  /**
   * Set resources
   *
   * @param {*} resources
   */
  public setResources(resources: any) {
    this.resources
    .setCustomerId(resources.customerId)
    .setMetadataId(resources.metadataId)
    .setPaymentId(resources.paymentId)
    .setTypeId(resources.typeId)
    .setRiskId(resources.riskId)
  }

  /**
   * Get Processing
   *
   * @returns {Processing}
   */
  public getProcessing(): Processing {
    return this.processing
  }

  /**
   * Set Processing
   *
   * @param {*} processing
   */
  public setProcessing(processing: any) {
    this.processing
    .setUniqueId(processing.uniqueId)
    .setShortId(processing.shortId)
  }
}