import Exception from '../Exception';

class PaymentType {
	constructor(id = '') {
		this.baseURL = '/v1/types'
		this.method = ''
		this.id = id
	}

	authorize() {
		throw new Exception('Not support')
	}

	charge() {
		throw new Exception('Not support')
	}

	cancel() {
		throw new Exception('Not support')
	}
}

export default PaymentType
