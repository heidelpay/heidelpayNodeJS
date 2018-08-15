var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Exception
 * @class
 * @property {string} message - Human friendly message
 * @property {string} type - Kind of error
 * @property {Exception} innerException - Inner exception
 **/
var Exception =

/**
 * Constructor
 * @param {string} message - message - Human friendly message
 * @param {string} type - Kind of error
 * @param {Exception} innerException - Optional inner exception
 * @param {bool} isFinal - Indicates if this exception prevents further execution
 **/
function Exception(message, type, innerException) {
  var isFinal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  classCallCheck(this, Exception);


  if (!message) {
    throw new Error('Message is mandatory to create a new Exception');
  }

  if (message && message instanceof Error) {
    var err = message;
    this.message = err.message || "Unknown error";
  } else if (typeof message === 'string') {
    this.message = message;
  } else if (message instanceof Exception) {
    return message;
  } else {
    this.message = "Unknown error";
  }

  this.innerException = innerException || null;
  this.type = type || "Generic exception";
  this.isFinal = isFinal;
};

/**
 * Heidelpay
 * @class
 * @property {string} privateKey 
 * @property {string} locale
 **/

var Heidelpay = function Heidelpay(privateKey) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  classCallCheck(this, Heidelpay);

  if (!privateKey) {
    throw new Exception('Private key is required');
  }
  this.privateKey = privateKey;
  this.locale = locale;
};

var PaymentType = function PaymentType() {
	classCallCheck(this, PaymentType);

	this.baseURL = '/v1/types';
	this.operations = ['create', 'fetch', 'update', 'del', 'delete', 'list'];
};

var Card = function (_PaymentType) {
  inherits(Card, _PaymentType);

  function Card() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var expiryDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var cvc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    classCallCheck(this, Card);

    var _this = possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this));

    _this.number = number;
    _this.expiryDate = expiryDate;
    _this.cvc = cvc;
    return _this;
  }

  return Card;
}(PaymentType);

var main = {
	Heidelpay: Heidelpay,
	Exception: Exception,
	PaymentType: PaymentType,
	Card: Card
};

export default main;
