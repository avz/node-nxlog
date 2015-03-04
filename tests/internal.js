var util = require('util');

var NxLog = require('../src/NxLog');

exports.timestamp = function(test) {
	var caseToDate = function(s) {
		var l = s.split(/[^0-9]+/g);
		var d = new Date;

		d.setUTCFullYear(parseInt(l[0]));
		d.setUTCMonth(parseInt(l[1]) - 1);
		d.setUTCDate(parseInt(l[2]));
		d.setUTCHours(parseInt(l[3]));
		d.setUTCMinutes(parseInt(l[4]));
		d.setUTCSeconds(parseInt(l[5]));
		d.setUTCMilliseconds(parseInt(l[6]));

		return d;
	};

	var cases = [
		'2014-02-01 12:00:00.321',
		'0014-02-01 00:00:00.000',
		'9999-12-31 23:59:59.999',
		'0000-01-01 01:00:00.100'
	];

	for(var i = 0; i < cases.length; i++) {
		var s = cases[i];

		var d = caseToDate(s);
		var actual = NxLog.timestamp(d);

		test.strictEqual(actual, s + ' UTC');
	}

	test.done();
};

exports.convertToString = function(test) {
	var exception = new Error('something is wrong');
	var date = new Date;

	var cases = [
		["no-white-spaces", "no-white-spaces"],
		["white spaces", "'white spaces'"],
		[123456, "123456"],
		[true, "true"],
		[false, "false"],
		[null, "null"],
		[undefined, "undefined"],
		[{}, 'Object {}'],
		[exception, exception.stack],
		[date, util.inspect(date)],
		[[], '[]'],
		[['hello'], "[ 'hello' ]"],
		[new Buffer('hello'), util.inspect(new Buffer('hello'))],
		[module, 'Module ' + util.inspect(module)],
		[/hello regex/i, 'RegExp /hello regex/i'],
		[NaN, 'NaN'],
		[Infinity, 'Infinity'],
		['', "''"]
	];

	for(var i = 0; i < cases.length; i++) {
		var expected = cases[i][1];
		var actual = NxLog.convertToString(cases[i][0]);

		test.strictEqual(actual, expected);
	}

	test.done();
};
