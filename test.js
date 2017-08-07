var BadiCal = require('./index'),
	fs = require('fs');

var testers = {};
testers['two-way'] = function(test){
	var dates = {};
	dates[test.input.type] = {
		date : 
			new BadiCal.BadiDate(
				test.input.year,
				test.input.month,
				test.input.date
			),
		daytime : test.input.daytime
	};
	dates[test.output.type] = {
		date : 
			new BadiCal.BadiDate(
				test.output.year,
				test.output.month,
				test.output.date
			),
		daytime : test.output.daytime
	};
	
	var badi = 
		BadiCal.GregorianToBadi(
			dates.Gregorian.date.y,
			dates.Gregorian.date.m,
			dates.Gregorian.date.d,
			!dates.Gregorian.daytime
		);
	var greg = 
		BadiCal.BadiToGregorian(
			dates.Badi.date.y,
			dates.Badi.date.m,
			dates.Badi.date.d,
			!dates.Badi.daytime
		);
	return dates.Gregorian.date.y === greg.y
		&& dates.Gregorian.date.m === greg.m
		&& dates.Gregorian.date.d === greg.d
		&& dates.Badi.date.y === badi.y
		&& dates.Badi.date.m === badi.m
		&& dates.Badi.date.d === badi.d;
};


if(process.argv.length > 2){
  var filepath = process.argv[2];
  fs.readFile(filepath, 'utf8', function (err,data) {
	if (err) {
	  return console.log(err);
	}
	var testgroup = JSON.parse(data);
	var failures = 0;
	console.log('Test Group:', testgroup.name);
	console.log('------------------');
	for(var i = 0, ilen = testgroup.tests.length; i < ilen; i++){
		var test = testgroup.tests[i];
		var result = testers[test.type](test);
		console.log('   ', test.name, '......', result ? 'success' : 'failure');
		if(!result){
			failures++;
		}
	}
	console.log(
		testgroup.tests.length + ' tests, ',
		failures + ' failures, ',
		(testgroup.tests.length - failures) + ' successes.'
	);
  });
}
