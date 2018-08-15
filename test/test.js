const assert = require('assert');
const Heidelpay = require('..').Heidelpay;
const Exception = require('..').Exception;
const Customer = require('..').Customer;

function test() {
	assert.throws(function() {
		new Heidelpay()
	}, Exception)

	console.log(`\u001B[32m✓\u001B[39m Exception throw when no private key`);
}

function test () {
	const heidelpay = new Heidelpay('s-private-key', 'en-US')

	// set other request adapter
	const request = new Axios() // other request adapter implement the interface than default one
	heidelpay.setAdapter(request)

	const customer = new Customer('Tuan', 'Nguyen')
	const customer = heidelpay.createCustomer(customer)
	const customer = heidelpay.fetchCustomer(id)

	const payment = heidelpay.createPayment(
		{ method: 'sepa', id: 's-sepa-idxxx'}, 
		customer
	)
	const payment = heidelpay.createPayment(
		{ method: 'sepa', iban: ''}
	)

	const payment = payment.authorize()
	payment.charge()

	heidelpay.authorize(43.05, 'EUR', '/url')
}
