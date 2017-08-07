module.exports = Object.freeze({
	GREGORIAN : 'GREGORIAN',
	BADI : 'BADI',
    MILLISECONDS_PER_DAY : 1000 * 60 * 60 * 24,
	NAWRUZ : require('./nawruz'),
	BADI_MONTHS : require('./months-badi'),
	GREGORIAN_MONTHS : require('./months-gregorian'),
	BADI_DAYS : require('./days-badi')
});
