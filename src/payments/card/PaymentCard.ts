import AbstractPayment from '../AbstractPayment'
import PaymentType from '../PaymentType'
import Authorization from '../Authorization'

class PaymentCard extends AbstractPayment implements PaymentType {
  // Delegate for Heidelpay.authorize()
  public authorize(amount: number, currency: string): Authorization {
    return this.getHeidelpay().authorize(amount, currency)
  }
}
