(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BadiCal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./constants":3}],2:[function(require,module,exports){
module.exports = [
	'Kamál', //Perfection
	'Fidál', //Grace
	'\'Idál', //Justice
	'Istijlál', //Majesty
	'Istiqlál', //Independence
	'Jalál', //Glory
	'Jamál' //Beauty
];

},{}],3:[function(require,module,exports){
module.exports = Object.freeze({
	GREGORIAN : 'GREGORIAN',
	BADI : 'BADI',
    MILLISECONDS_PER_DAY : 1000 * 60 * 60 * 24,
	NAWRUZ : require('./nawruz'),
	BADI_MONTHS : require('./months-badi'),
	GREGORIAN_MONTHS : require('./months-gregorian'),
	BADI_DAYS : require('./days-badi')
});

},{"./days-badi":2,"./months-badi":4,"./months-gregorian":5,"./nawruz":6}],4:[function(require,module,exports){
module.exports = [
	'Baha',		//Splendor
	'Jalal',	//Glory
	'Jamal',	//Beauty
	'Azamat',	//Grandeur
	'Nur',		//Light
	'Rahmat',	//Mercy
	'Kalimat',	//Words
	'Kamal',	//Perfection
	'Asma',		//Names
	'Izzat',	//Might
	'Mashiyyat',//Will
	'Ilm',		//Knowledge
	'Qudrat',	//Power
	'Qawl',		//Speech
	'Masa\'il', //Questions
	'Sharaf',	//Honor
	'Sultan',	//Sovereignty
	'Mulk',		//Dominion
	'Ayyam-i-Ha',//Days of Ha
	'Ala'		//Loftiness
];

},{}],5:[function(require,module,exports){
module.exports = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

},{}],6:[function(require,module,exports){
//reference: http://wilmetteinstitute.org/wp-content/uploads/2014/11/Bahai-Dates-172-to-221-B-E-_UK-December-2014.pdf
//Day of, starts night before
module.exports = {
	'2015' : 21,
	'2016' : 20,
	'2017' : 20,
	'2018' : 21,
	'2019' : 21,
	'2020' : 20,
	'2021' : 20,
	'2022' : 21,
	'2023' : 21,
	'2024' : 20,
	'2025' : 20,
	'2026' : 21,
	'2027' : 21,
	'2028' : 20,
	'2029' : 20,
	'2030' : 20,
	'2031' : 21,
	'2032' : 20,
	'2033' : 20,
	'2034' : 20,
	'2035' : 21,
	'2036' : 20,
	'2037' : 20,
	'2038' : 20,
	'2039' : 21,
	'2040' : 20,
	'2041' : 20,
	'2042' : 20,
	'2043' : 21,
	'2044' : 20,
	'2045' : 20,
	'2046' : 20,
	'2047' : 21,
	'2048' : 20,
	'2049' : 20,
	'2050' : 20,
	'2051' : 21,
	'2052' : 20,
	'2053' : 20,
	'2054' : 20,
	'2055' : 21,
	'2056' : 20,
	'2057' : 20,
	'2058' : 20,
	'2059' : 20,
	'2060' : 20,
	'2061' : 20,
	'2062' : 20,
	'2063' : 20,
	'2064' : 20
};

},{}],7:[function(require,module,exports){
//build: browserify index.js --standalone BadiCal -o bundle/BadiCal.js
var constants = require('./constants'),
	BadiDate = require('./BadiDate');
/**
 * Gets Gregorian Date of Month (base 1) for Nawruz in year from a Gregorian BadiDate
 * 
 * @param BadiDate gDate
 * @return
 */
var getNawruz =
	function(gDate){
		if(constants.NAWRUZ[''+gDate.year()] === undefined){
			return 21;
		}
		return constants.NAWRUZ[''+gDate.year()];
	};

/**
 * Checks if a Gregorian date is before or after Nawruz of that Gregorian year
 * 
 * @param BadiDate gDate
 * @return boolean
 */
var beforeNawruz = 
	function(gDate){
		return gDate.month() < 3 || (gDate.month() == 3 && gDate.day() < getNawruz(gDate));
	};

/**
 * Gets the Javascript Date object for Nawruz in a Gregorian year
 * 
 * @param integer gYear
 * @return Date
 */
var getNawruzDate =
	function(gYear){
		return new Date(
			gYear, 
			2 /*Zero based*/, 
			getNawruz(new BadiDate(gYear, 4, 1))
		);
	};

/**
 * Gets the Javascript Date object for a BadiDate
 * 
 * @param BadiDate gDate
 * @return Date
 */	
var gToDate =
	function(gDate){
		return new Date(
			gDate.year(), 
			gDate.month() - 1, 
			gDate.day()
		);
	};

/**
 * 
 * 
 * @param
 * @return
 */
var getAyyamiha =
	function(bYear){
		var gYear = parseInt(bYear) + 1843;

		var this_nr = 
			new Date(
				gYear, 
				2 /*Zero based*/, 
				getNawruz(new BadiDate(gYear, 4, 1))
			);
		var next_nr = 
			new Date(
				gYear + 1, 
				2 /*Zero based*/, 
				getNawruz(new BadiDate(gYear + 1, 4, 1))
			);

		return (next_nr - this_nr) / (constants.MILLISECONDS_PER_DAY) - (19 * 19);
	};

var getMonthDays =
	function(bYear){
		var months = [];
		for(var i = 0; i < 18; i++){
			months.push(19);
		}
		months.push(getAyyamiha(bYear));
		months.push(19);

		return months;
	};

/**
 * 
 * 
 * @param
 * @return
 */
var GregorianToBadi = 
	function(one, two, three, startOf){
		if(startOf === undefined){
			startOf = false;
		}

		if(startOf){
			three++;
		}

		var gDate = new BadiDate(one, two, three);
		var year = gDate.year();
		if(beforeNawruz(gDate)){
			year--;
		}

		var nr_date = getNawruzDate(year);
		var num_days = Math.floor((gToDate(gDate) - nr_date) / constants.MILLISECONDS_PER_DAY) + 1;//base 1

		var bYear = year - 1843;

		var months = getMonthDays(bYear);

		var m = 0;
		while(num_days > months[m]){
			num_days -= months[m++];
		}

		return new BadiDate(bYear, m + 1, num_days, constants.BADI);
	};

/**
 * 
 * 
 * @param
 * @return
 */
var BadiToGregorian = 
	function(one, two, three, startsOn){
		if(startsOn === undefined){
			startsOn = false;
		}

		var bDate = new BadiDate(one, two, three);
		if(startsOn){
			//bDate.sub(1);
		}

		var nr_year = bDate.year() + 1843;
		var nr_date = getNawruzDate(nr_year);

		var num_days = 
			Math.min(bDate.month() - 1, 18)*19 //first 18 months
			+ (bDate.month() > 19 ? getAyyamiha(bDate.year()) : 0) //Ayyam-i-Ha
			+ bDate.day() //days in month
			- 1
		;

		if(startsOn){
			num_days--;
		}

		var date = new Date(nr_date.getTime() + num_days*constants.MILLISECONDS_PER_DAY + (4*60*60*1000));//4 hours to deal with DST

		return new BadiDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), constants.GREGORIAN);
	};
module.exports = {
	constants : constants,
	BadiDate  : BadiDate,
	GregorianToBadi : GregorianToBadi,
	BadiToGregorian : BadiToGregorian,
	getAyyamiha : getAyyamiha
};
},{"./BadiDate":1,"./constants":3}]},{},[7])(7)
});