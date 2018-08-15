import Exception from './Exception'
import Config from './Config'
import Customer from './business/Customer';
import RequestAdapter from './RequestAdapter';
import Payment from './business/Payment';

/**
 * Heidelpay
 * @class
 * @property {string} privateKey
 * @property {string} locale
 **/
export default class Heidelpay {
  constructor(private_key, locale = 'en-US') {
		if (!private_key) {
			throw new Exception('Private key is required')
		}

		this.config = new Config({
      private_key,
      api_host: 'dev-api.heidelpay.com'
		})

		this.privateKey = private_key
		this.locale = locale

		this.request = new RequestAdapter(this.config)
	}

	setAdapter(request) {
		this.request = request
	}

	isSandbox() {
		return this.isSandbox
	}

	createPayment = (amount, currency, returnUrl, type, customer) => {
		return new Payment(amount, currency, returnUrl, type, customer)
	}
	fetchPayment = () => {}

	createCustomer = (customer) => {
		return new Customer(customer)
	}
	fetchCustomer = (id) => {
    const customer = this.request.get(`/customer/${id}`)
		return new Customer(customer)
	}
	updateCustomer = () => {}
	deleteCustomer = () => {}

	createType = () => {}
	fetchType = () => {}

	authorize = () => {}
	charge = () => {}
	cancel = () => {}
}
