import AbstractPayment from '../payments/AbstractPayment'
import Heidelpay from '../Heidelpay'
import Resources from '../payments/Resources'
/**
 * Class Cancel
 *
 * @export
 * @class Cancel
 * @extends {AbstractPayment}
 */
export class Cancel extends AbstractPayment {
  private resources: Resources

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources()
  }
  /**
   * Set resources
   *
   * @param {Resources} resources
   */
  public setResources(resources: Resources): void {
    this.resources = resources
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }
}

export type cancelAuthorizeObject = {
  paymentId: string
  authorizationId: string
  amount?: number
}
