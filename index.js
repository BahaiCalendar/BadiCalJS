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