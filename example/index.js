require("@babel/core")
import Heidelpay, {Card, Customer} from '@heidelpay/nodejs-sdk'

const excuteScript = async () => {
  const heidelpay = new Heidelpay('s-priv-2a102ZMq3gV4I3zJ888J7RR6u75oqK3n')
  const customer = new Customer('Rene', 'Fred')
  const card = new Card('4711100000000000', '01/2022').setCVC('123')

  try {
    const newCustomer = await heidelpay.createCustomer(customer)
    const paymentCard = await heidelpay.createPaymentType(card)
    const authorize = await paymentCard.authorize({
      amount: 100,
      currency: 'EUR',
      typeId: paymentCard.getId(),
      returnUrl: 'https://www.google.at'
    })

    console.log('newCustomer', newCustomer.getCustomerId())
    console.log('paymentCard', paymentCard.getId())
    console.log('authorize', authorize.getId())
  } catch (error) {
    console.log('error', error)
  }
}

excuteScript()
