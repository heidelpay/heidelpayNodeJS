import AbstractPayment from '../AbstractPayment'
import PaymentType from '../PaymentType'
import Authorization from '../../business/Authorization'

export default class PaymentCard extends AbstractPayment implements PaymentType {
  public authorize(amount: number, currency: string): Promise<Authorization> {
    return this.getHeidelpay().authorize(amount, currency, this.getId())
  }
}
