import AbstractPayment from '../AbstractPayment'
import PaymentType from '../PaymentType'
import Authorization, { authorizeObject } from '../../business/Authorization'

/**
 * Class Payment Card
 *
 * @export
 * @class PaymentCard
 * @extends {AbstractPayment}
 * @implements {PaymentType}
 */
export default class PaymentCard extends AbstractPayment implements PaymentType {
  /**
   * Authorize with payment card
   *
   * @param {authorizeObject} args
   * @returns {Promise<Authorization>}
   */
  public authorize(args: authorizeObject): Promise<Authorization> {
    return this.getHeidelpay().authorize(args)
  }
}
