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

  /**
   * Creates an instance of Cancel.
   * @param {Heidelpay} heidelpay
   */
  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources(heidelpay)
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
