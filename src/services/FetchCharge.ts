import PaymentService from './PaymentService'
import Charge from '../payments/business/Charge';

export default (args: string, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async resolve => {
    // Call api end point to get response
    const response: any = await paymentService
      .getRequestAdapter()
      .get(args, paymentService.getHeidelpay().getPrivateKey(), true)

    // New Charge with Hedeipay instance
    let charge = new Charge(paymentService.getHeidelpay())

    // Set charge Id
    charge.setId(response.id)

    // Set amount of charge
    charge.setAmount(response.amount)

    // Set resources
    charge.setResources(response.resources)

    // Resolve final result
    resolve(charge)
  })
}
