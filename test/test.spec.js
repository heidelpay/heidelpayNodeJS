const expect = require('chai').expect
const Heidelpay = require('..').Heidelpay;
const Exception = require('..').Exception;
const Customer = require('..').Customer;

it('Exception throw when no private key', () => {
  expect(function() {
		new Heidelpay()
	}).to.throws(Exception)
})

it('test heidelpay lib', () => {
  const heidelpay = new Heidelpay('s-private-key', 'en-US')

	// set other request adapter
	// const request = new Axios() // other request adapter implement the interface than default one
	// heidelpay.setAdapter(request)

	let customer = new Customer('Tuan', 'Nguyen')
	customer = heidelpay.createCustomer(customer)
	customer = heidelpay.fetchCustomer()

	let payment = heidelpay.createPayment(
		{ method: 'sepa', id: 's-sepa-idxxx'},
		customer
	)
	payment = heidelpay.createPayment(
		{ method: 'sepa', iban: ''}
	)

	payment = payment.authorize()
	payment.charge()

	heidelpay.authorize(43.05, 'EUR', '/url')
})
