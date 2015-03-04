"use strict";

var util = require('util');

function NxLog() {

};

/**
 * @param {Date} now current date
 * @returns {String} "2015-03-06 16:40:50.560 UTC"
 */
NxLog.timestamp = function(now) {
	var zeropad = function(num, len) {
		var pad;

		if(len === 2)
			pad = 100;
		else if(len === 3)
			pad = 1000;
		else if(len === 4)
			pad = 10000;

		return (pad + num).toString().substr(1);
	};

	var year = now.getUTCFullYear();
	var month = now.getUTCMonth() + 1;
	var day = now.getUTCDate();

	var hour = now.getUTCHours();
	var minute = now.getUTCMinutes();
	var second = now.getUTCSeconds();
	var ms = now.getUTCMilliseconds();

	var string =
		        zeropad(year, 4)
		+ '-' + zeropad(month, 2)
		+ '-' + zeropad(day, 2)

		+ ' ' + zeropad(hour, 2)
		+ ':' + zeropad(minute, 2)
		+ ':' + zeropad(second, 2)

		+ '.' + zeropad(ms, 3)
		+ ' UTC'
	;

	return string;
};

/**
 * Набор хардкодов для красивого отображения разных типов
 * @param {type} orig
 * @returns {String}
 */
NxLog.convertToString = function(orig) {
	var s = util.inspect(orig);

	switch(typeof(orig)) {
		case 'string':
			if(!orig.length)
				return "''";

			if(!/\s+/.test(s) && s === "'" + orig + "'")
				return orig;
		break;
		case 'object':
			if(orig instanceof Error)
				return orig.stack;

			if(orig instanceof Date || orig instanceof Array || orig instanceof Buffer)
				return s;

			if(orig && orig.constructor && orig.constructor.name)
				s = orig.constructor.name + ' ' + s;
		break;
	}

	return s;
};

NxLog.stringify = function(args) {
	var lines = [];

	for(var i = 0; i < args.length; i++) {
		var arg = args[i];
		var ls;

		/*
		 * если первый аргумент - однострочная строка, то выдаём его как есть
		 * без кавычек
		 */
		if(i === 0 && typeof(arg) === 'string' && arg.indexOf('\n') === -1) {
			ls = [arg];
		} else {
			ls = NxLog.convertToString(arg).split('\n');
		}

		if(ls.length === 1) {
			if(lines.length === 1)
				lines[0] += ' ' + ls[0];
			else
				lines.push(ls[0]);
		} else {
			for(var li = 0; li < ls.length; li++)
				lines.push(ls[li]);
		}
	}

	return lines;
};

NxLog.wrap = function(type, args) {
	var ts = NxLog.timestamp(new Date);

	var prefix = ts + ' [' + type + ']';

	var lines;

	lines = NxLog.stringify(args);

	lines[0] = prefix + ' ' + lines[0];

	for(var i = 1; i < lines.length; i++)
		lines[i] = prefix + ' ... ' + lines[i];

	return lines.join('\n') + '\n';
}

NxLog.write = function(type, args) {
	try {
		var string = NxLog.wrap(type, args);

		process.stderr.write(string);
	} catch(e) {
		console.error('NxLog critical error', arguments, e.stack);
	}
};

NxLog.prototype.debug = function(/* ... */) {
	NxLog.write('DEBUG', arguments);
};

NxLog.prototype.error = function(/* ... */) {
	NxLog.write('ERROR', arguments);
};

NxLog.prototype.warn = function(/* ... */) {
	NxLog.write('WARN', arguments);
};

NxLog.prototype.info = function(/* ... */) {
	NxLog.write('INFO', arguments);
};

NxLog.prototype.log = NxLog.prototype.info;

NxLog.prototype.inject = function(consoleObject) {
	consoleObject.log = this.log;
	consoleObject.warn = this.warn;
	consoleObject.info = this.info;
	consoleObject.error = this.error;
};

module.exports = NxLog;
