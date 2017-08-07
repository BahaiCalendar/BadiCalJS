var constants = require('./constants');
var addZero =
	function(n){
		if(parseInt(n) > 9){
			return n;
		}
		return '0' + parseInt(n);
	};

//Date Object used internally
var BadiDate =
	function(year, month, day, type){
		if(type === undefined){
			type = constants.GREGORIAN;
		}

		this.y = parseInt(year);
		this.m = parseInt(month);
		this.d = parseInt(day);
		this.type = type;
	};
BadiDate.prototype.year = 
	function(formatted){
		if(formatted === undefined){
			formatted = false;
		}

		return formatted ? addZero(this.y) : this.y;
	};
BadiDate.prototype.month = 
	function(formatted){
		if(formatted === undefined){
			formatted = false;
		}

		return formatted ? addZero(this.m) : this.m;
	};
BadiDate.prototype.monthName = 
	function(){
		switch(this.type){
			case constants.GREGORIAN:
				return constants.GREGORIAN_MONTHS[this.m - 1];
				break;
			case constants.BADI:
			default:
				return constants.BADI_MONTHS[this.m - 1];
		}
	};
BadiDate.prototype.day = 
	function(formatted){
		if(formatted === undefined){
			formatted = false;
		}

		return formatted ? addZero(this.d) : this.d;
	};

module.exports = BadiDate;