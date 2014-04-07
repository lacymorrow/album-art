'use strict';
var path = require('path');

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new Error('Expected a string');
	}

	var pathName = 'hello, world!';

	return encodeURI('http://' + pathName);
};
